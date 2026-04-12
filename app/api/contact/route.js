import nodemailer from 'nodemailer'
import {NextResponse} from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const {name, email, phone, message} = body

    if (!name || !email || !phone || !message) {
      return NextResponse.json({message: 'All fields are required.'}, {status: 400})
    }

    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const recipient = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER

    if (!host || !user || !pass || !recipient) {
      return NextResponse.json(
        {
          message:
            'Email service is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS and CONTACT_TO_EMAIL.',
        },
        {status: 500},
      )
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {user, pass},
    })

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL || user,
      to: recipient,
      subject: `New solar enquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
      html: `
        <h2>New Solar Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return NextResponse.json({message: 'Message sent successfully.'}, {status: 200})
  } catch {
    return NextResponse.json({message: 'Failed to send message.'}, {status: 500})
  }
}
