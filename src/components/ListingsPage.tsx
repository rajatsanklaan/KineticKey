import type { Listing } from '../types'
import { listings } from '../data/listings'
import PageHeader from './PageHeader'
import SearchBar from './SearchBar'
import PropertyGrid from './PropertyGrid'
import './ListingsPage.css'

type Props = {
  onOpenListing: (listing: Listing) => void
}

export default function ListingsPage({ onOpenListing }: Props) {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Rent a room"
        title={`${listings.length} rooms in Dublin 6 and 8`}
        text="Filter by area, rooms in the house, nearby walking times and monthly rent."
      />
      <section className="section listings-page">
        <div className="container">
          <SearchBar />
          <div className="listings-grid-wrap">
            <PropertyGrid items={listings} onOpen={onOpenListing} />
          </div>
        </div>
      </section>
    </div>
  )
}
