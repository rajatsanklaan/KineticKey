import { useRef } from 'react'
import type { Listing } from '../types'
import { formatBills, formatPrice, listings } from '../data/listings'
import HousePlaceholder from './HousePlaceholder'
import './NewRooms.css'

type Props = {
  onOpenListing: (listing: Listing) => void
}

export default function NewRooms({ onOpenListing }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const items = [...listings].reverse().slice(0, 5)

  function scrollBy(direction: 1 | -1) {
    const box = scrollerRef.current
    if (!box) return
    box.scrollBy({ left: direction * 300, behavior: 'smooth' })
  }

  return (
    <section className="section new-rooms">
      <div className="container">
        <div className="new-rooms-head">
          <div className="section-head">
            <p className="eyebrow">Just listed</p>
            <h2>Newly added rooms</h2>
          </div>
          <div className="new-rooms-nav">
            <button type="button" aria-label="Previous rooms" onClick={() => scrollBy(-1)}>
              ‹
            </button>
            <button type="button" aria-label="Next rooms" onClick={() => scrollBy(1)}>
              ›
            </button>
          </div>
        </div>

        <div className="new-rooms-track" ref={scrollerRef}>
          {items.map((listing) => (
            <article key={listing.id} className="new-room-card">
              <button
                className="new-room-media"
                type="button"
                onClick={() => onOpenListing(listing)}
              >
                <HousePlaceholder label={`${listing.title} photo`} fileName={listing.photo} />
              </button>
              <div className="new-room-body">
                <h3>{listing.title}</h3>
                <p>
                  {listing.meta}
                  <br />
                  {listing.location}
                </p>
                <strong>
                  {formatPrice(listing)}
                  <small> / month · {formatBills(listing)}</small>
                </strong>
                <button
                  className="new-room-contact"
                  type="button"
                  onClick={() => onOpenListing(listing)}
                >
                  View room
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
