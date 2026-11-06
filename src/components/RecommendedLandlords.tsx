import { useRef, useState } from 'react'
import type { Page } from '../types'
import { landlords } from '../data/landlords'
import './RecommendedLandlords.css'

type Props = {
  onNavigate: (page: Page) => void
}

export default function RecommendedLandlords({ onNavigate }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [openContact, setOpenContact] = useState<string | null>(null)

  function scrollBy(direction: 1 | -1) {
    const box = scrollerRef.current
    if (!box) return
    box.scrollBy({ left: direction * 280, behavior: 'smooth' })
  }

  return (
    <section className="section rec-landlords">
      <div className="container">
        <div className="rec-head">
          <div className="section-head">
            <p className="eyebrow">Trusted hosts</p>
            <h2>Recommended landlords</h2>
          </div>
          <div className="rec-nav">
            <button type="button" aria-label="Previous landlords" onClick={() => scrollBy(-1)}>
              ‹
            </button>
            <button type="button" aria-label="Next landlords" onClick={() => scrollBy(1)}>
              ›
            </button>
          </div>
        </div>

        <div className="rec-track" ref={scrollerRef}>
          {landlords.map((landlord) => (
            <article key={landlord.id} className="rec-card">
              <header className={`rec-card-top tone-${landlord.tone}`}>
                <span className="rec-av" aria-hidden="true">
                  {landlord.initial}
                </span>
                <button type="button" onClick={() => onNavigate('listings')}>
                  {landlord.name}
                  <span aria-hidden="true">›</span>
                </button>
              </header>

              <div className="rec-stats">
                <div>
                  <strong>{landlord.years}</strong>
                  <span>Years listing</span>
                </div>
                <div>
                  <strong>{landlord.listings}</strong>
                  <span>Total rooms</span>
                </div>
              </div>

              <div className="rec-areas">
                {landlord.areas.map((area) => (
                  <span key={area}>{area}</span>
                ))}
              </div>

              {openContact === landlord.id ? (
                <p className="rec-phone">{landlord.phone}</p>
              ) : (
                <button
                  className="rec-contact"
                  type="button"
                  onClick={() => setOpenContact(landlord.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6.5 4.5h3l1.5 4-2 1.2a12 12 0 0 0 5.3 5.3l1.2-2 4 1.5v3A2 2 0 0 1 17.5 19.5 13 13 0 0 1 4.5 6.5a2 2 0 0 1 2-2z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Show contact
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
