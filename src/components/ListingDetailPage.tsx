import type { Listing } from '../types'
import { formatBills, formatPrice, listings } from '../data/listings'
import HousePlaceholder from './HousePlaceholder'
import BookingCard from './BookingCard'
import PropertyGrid from './PropertyGrid'
import './ListingDetailPage.css'

type Props = {
  listing: Listing
  onBack: () => void
  onOpen: (listing: Listing) => void
}

export default function ListingDetailPage({ listing, onBack, onOpen }: Props) {
  const extras = listings.filter((item) => item.id !== listing.id).slice(0, 3)
  const thumbs = [listing.photo, extras[0]?.photo, extras[1]?.photo].filter(
    (name): name is string => Boolean(name),
  )

  const stats = [
    { label: 'Room', value: listing.roomType },
    { label: 'House', value: `${listing.houseBeds}-bed` },
    { label: 'Area', value: listing.area },
    { label: 'Bills', value: listing.billsIncluded ? 'Included' : 'Extra' },
    { label: 'Available', value: listing.available },
  ]

  return (
    <div className="page">
      <section className="section detail-page">
        <div className="container">
          <button className="detail-back" type="button" onClick={onBack}>
            Back to rooms
          </button>

          <div className="detail-gallery">
            <div className="detail-hero-photo">
              <HousePlaceholder label={`${listing.title} photo`} fileName={listing.photo} />
              <span className="detail-photo-count">1 / {listing.photoCount}</span>
            </div>
            <div className="detail-thumbs">
              {thumbs.map((fileName) => (
                <div key={fileName} className="detail-thumb">
                  <HousePlaceholder label="Listing photo" fileName={fileName} />
                </div>
              ))}
            </div>
          </div>

          <div className="detail-layout">
            <div>
              <p className="eyebrow">{listing.location}</p>
              <h1 className="detail-title">{listing.title}</h1>
              <p className="detail-price-line">
                {formatPrice(listing)}
                <small> / month · {formatBills(listing)}</small>
              </p>
              <div className="detail-stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="detail-stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="section-head">
                <p className="eyebrow">About this room</p>
                <h2>What you should know</h2>
                <p className="muted">{listing.description}</p>
              </div>
              <div className="section-head">
                <p className="eyebrow">Near by</p>
                <h2>Walking times</h2>
              </div>
              <ul className="detail-amenities">
                {listing.walking.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="section-head" style={{ marginTop: '2rem' }}>
                <p className="eyebrow">Included</p>
                <h2>Amenities</h2>
              </div>
              <ul className="detail-amenities">
                {listing.amenities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="detail-landlord">
                Listed by {listing.landlord} · Available {listing.available}
              </p>
            </div>
            <BookingCard listing={listing} />
          </div>

          {extras.length > 0 && (
            <div className="detail-similar">
              <div className="section-head">
                <p className="eyebrow">More rooms</p>
                <h2>Similar listings</h2>
              </div>
              <PropertyGrid items={extras} onOpen={onOpen} />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
