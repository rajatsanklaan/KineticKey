import { useState } from 'react'
import type { Page } from '../types'
import './Navbar.css'

const links: { label: string; page: Page }[] = [
  { label: 'Rent a room', page: 'listings' },
  { label: 'For landlords', page: 'owner' },
  { label: 'Sign in', page: 'signin' },
]

type Props = {
  page: Page
  onNavigate: (page: Page) => void
}

export default function Navbar({ page, onNavigate }: Props) {
  const [open, setOpen] = useState(false)

  function go(next: Page) {
    onNavigate(next)
    setOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button className="navbar-logo" type="button" onClick={() => go('home')}>
          <span className="navbar-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="22" height="22">
              <rect x="2" y="2" width="28" height="28" rx="8" fill="#212529" />
              <circle cx="13" cy="13" r="5" fill="none" stroke="#f8f9fa" strokeWidth="2" />
              <path
                d="M16.6 16.6 L24 24 M21 21 H24 M21.6 24 H24"
                fill="none"
                stroke="#ced4da"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          KineticKey
        </button>

        <button
          className={`navbar-toggle${open ? ' is-open' : ''}`}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-menu${open ? ' is-open' : ''}`} aria-label="Primary">
          {links.map((link) => (
            <button
              key={link.page}
              type="button"
              className={
                page === link.page || (page === 'detail' && link.page === 'listings')
                  ? 'is-active'
                  : undefined
              }
              onClick={() => go(link.page)}
            >
              {link.label}
            </button>
          ))}
          <button className="navbar-cta" type="button" onClick={() => go('owner')}>
            List a room
          </button>
        </nav>
      </div>
    </header>
  )
}
