import type { Listing } from '../types'
import PropertyCard from './PropertyCard'
import './PropertyGrid.css'

type Props = {
  items: Listing[]
  onOpen?: (listing: Listing) => void
}

export default function PropertyGrid({ items, onOpen }: Props) {
  return (
    <div className="property-grid">
      {items.map((listing) => (
        <PropertyCard key={listing.id} listing={listing} onOpen={onOpen} />
      ))}
    </div>
  )
}
