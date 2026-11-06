import type { Listing, Page } from '../types'
import { listings } from '../data/listings'
import Hero from './Hero'
import Stats from './Stats'
import RoleCards from './RoleCards'
import LandlordPitch from './LandlordPitch'
import BothSides from './BothSides'
import RecommendedLandlords from './RecommendedLandlords'
import NewRooms from './NewRooms'
import PropertyGrid from './PropertyGrid'
import HowItWorks from './HowItWorks'
import Testimonials from './Testimonials'
import CtaBanner from './CtaBanner'

type Props = {
  onNavigate: (page: Page) => void
  onOpenListing: (listing: Listing) => void
}

export default function HomePage({ onNavigate, onOpenListing }: Props) {
  return (
    <div className="page">
      <Hero onNavigate={onNavigate} />
      <Stats onNavigate={onNavigate} />
      <RoleCards onNavigate={onNavigate} />
      <LandlordPitch onNavigate={onNavigate} />
      <BothSides onNavigate={onNavigate} />
      <RecommendedLandlords onNavigate={onNavigate} />
      <NewRooms onOpenListing={onOpenListing} />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Featured rooms</p>
            <h2>Rooms in Dublin 6 and 8</h2>
            <p className="muted">
              Real photos from landlords, with walking times to the Luas, shops and the park.
            </p>
          </div>
          <PropertyGrid items={listings.slice(0, 3)} onOpen={onOpenListing} />
        </div>
      </section>
      <HowItWorks />
      <Testimonials />
      <CtaBanner onNavigate={onNavigate} />
    </div>
  )
}
