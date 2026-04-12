"use client"

import {useState} from 'react'

const initialState = {name: '', email: '', phone: '', message: ''}

export default function ContactForm() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState({loading: false, message: '', error: false})

  const onChange = (e) => {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({loading: true, message: '', error: false})

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Unable to submit form.')
      }

      setForm(initialState)
      setStatus({loading: false, message: 'Message sent successfully.', error: false})
    } catch (error) {
      setStatus({loading: false, message: error.message, error: true})
    }
  }

  return (
    <form className="contact-form card-soft" onSubmit={onSubmit}>
      <div className="contact-form-head">
        <p className="contact-kicker">Professional Consultation</p>
        <h3>Request a Call Back</h3>
        <p>Share your details and our solar advisor will contact you within one business day.</p>
      </div>

      <div className="field-grid two-col">
        <label htmlFor="name">
          Full Name
          <input
            id="name"
            required
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Your full name"
            autoComplete="name"
          />
        </label>
        <label htmlFor="email">
          Work Email
          <input
            id="email"
            required
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <label htmlFor="phone">
          Phone Number
          <input
            id="phone"
            required
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            inputMode="tel"
          />
        </label>
        <label htmlFor="message">
          Project Requirements
          <textarea
            id="message"
            required
            rows={5}
            name="message"
            value={form.message}
            onChange={onChange}
            placeholder="Tell us about your location, average bill, and installation timeline."
          />
        </label>
      </div>

      <button className="btn contact-submit" type="submit" disabled={status.loading}>
        {status.loading ? 'Sending Request...' : 'Request Consultation'}
      </button>

      <p className="contact-note">By submitting this form, you agree to be contacted by our team.</p>

      {status.message ? <p className={status.error ? 'status error' : 'status success'}>{status.message}</p> : null}
    </form>
  )
}
