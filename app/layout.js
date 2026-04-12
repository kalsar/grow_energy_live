import './globals.css'

export const metadata = {
  metadataBase: new URL('https://growenergy.example.com'),
  title: {
    default: 'Grow Energy | Solar Energy Company',
    template: '%s | Grow Energy',
  },
  description:
    'Grow Energy provides professional solar installation services for homes and businesses with long-term savings and clean energy performance.',
  keywords: ['solar energy', 'solar installation', 'rooftop solar', 'renewable energy', 'grow energy'],
  openGraph: {
    title: 'Grow Energy | Solar Energy Company',
    description: 'High-performance solar systems designed for savings, reliability, and sustainability.',
    url: 'https://growenergy.example.com',
    siteName: 'Grow Energy',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
}

import Navbar from '@/components/Navbar'

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
