"use client"

import Link from 'next/link'
import WavyText from '@/components/WavyText'

export default function HeroBanner() {
  return (
    <section id="home" className="hero section">
      <div className="container hero-inner">
        <p className="eyebrow">Solar Solutions for Homes & Businesses</p>
        <h1>
          <WavyText text="Powering Tomorrow With Grow Energy" />
        </h1>
        <p className="hero-text">
          Smart solar installations engineered for performance, savings, and long-term reliability.
        </p>
        <p className="rotating-text" aria-live="polite">
          Trusted solar engineering. Predictable savings. Cleaner operations.
        </p>
        <div className="hero-actions">
          <Link href="#contact" className="btn">
            Get Free Consultation
          </Link>
          <Link href="#projects" className="btn btn-secondary">
            See Our Work
          </Link>
        </div>
      </div>
    </section>
  )
}
