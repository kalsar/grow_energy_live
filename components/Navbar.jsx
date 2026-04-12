"use client"

import Link from 'next/link'
import Image from 'next/image'
import {Menu, X} from 'lucide-react'
import {useEffect, useState} from 'react'

const navItems = [
  {href: '#why-solar', label: 'Why Solar'},
  {href: '#calculator', label: 'Calculator'},
  {href: '#projects', label: 'Our Work'},
  {href: '#faq', label: 'FAQ'},
  {href: '#contact', label: 'Contact'},
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="container nav-wrap" aria-label="Main Navigation">
        <Link href="#home" className="logo" onClick={() => setIsOpen(false)} aria-label="Grow Energy Home">
          <Image
            src="/grow-energy-logo-svg.png"
            alt="Grow Energy Logo"
            width={170}
            height={52}
            priority
            className="logo-image"
          />
        </Link>

        <button
          className="menu-btn"
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link className="nav-link" href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link className="btn btn-sm" href="#contact" onClick={() => setIsOpen(false)}>
              Free Consultation
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
