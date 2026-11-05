import { useState, type FormEvent } from 'react'
import type { Listing } from '../types'
import { formatBills, formatPrice } from '../data/listings'
import './BookingCard.css'

type Props = {
  listing: Listing
}

export default function BookingCard({ listing }: Props) {
  const [sent, setSent] = useState(false)

  function book(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <aside className="booking-card">
      <p className="eyebrow">Ready to visit</p>
      <p className="booking-price">
        {formatPrice(listing)}
        <small> / month · {formatBills(listing)}</small>
      </p>
      <p className="booking-note">
        Book a viewing of {listing.title} with {listing.landlord}.
      </p>

      {sent ? (
        <p className="booking-done">Request sent. We will confirm your viewing soon.</p>
      ) : (
        <form onSubmit={book}>
          <label>
            Full name
            <input type="text" name="name" placeholder="Aoife Brennan" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@email.com" required />
          </label>
          <label>
            Viewing date
            <input type="date" name="date" required />
          </label>
          <label>
            Note
            <textarea name="note" rows={3} placeholder="Move-in date, questions about bills, etc." />
          </label>
          <button className="btn btn-accent" type="submit">
            Book a viewing
          </button>
        </form>
      )}
    </aside>
  )
}
