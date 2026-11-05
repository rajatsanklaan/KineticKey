import type { Listing } from '../types'
import { formatBills, formatPrice } from '../data/listings'
import HousePlaceholder from './HousePlaceholder'
import './PropertyCard.css'

type Props = {
  listing: Listing
  onOpen?: (listing: Listing) => void
}

export default function PropertyCard({ listing, onOpen }: Props) {
  return (
    <button
      type="button"
      className="property-card"
      onClick={() => onOpen?.(listing)}
    >
      <div className="property-card-media">
        <HousePlaceholder label={`${listing.title} photo`} fileName={listing.photo} />
        <span className="property-card-count">1 / {listing.photoCount}</span>
      </div>
      <div className="property-card-body">
        <p className="property-card-price">
          {formatPrice(listing)}
          <small> / month · {formatBills(listing)}</small>
        </p>
        <h3>{listing.title}</h3>
        <p className="property-card-location">{listing.location}</p>
        <p className="property-card-meta">{listing.meta}</p>
        <div className="property-card-tags">
          {listing.walking.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="property-card-by">
          <span className="property-card-av" aria-hidden="true">
            {listing.landlordInitial}
          </span>
          {listing.landlord} · Available {listing.available}
        </div>
      </div>
    </button>
  )
}
