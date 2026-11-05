import type { Page } from '../types'
import './CtaBanner.css'

type Props = {
  onNavigate: (page: Page) => void
}

export default function CtaBanner({ onNavigate }: Props) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2>Rooms listed by the people who own the door.</h2>
          </div>
          <div className="cta-actions">
            <button className="btn btn-accent" type="button" onClick={() => onNavigate('owner')}>
              List a room
            </button>
            <button className="btn btn-line" type="button" onClick={() => onNavigate('listings')}>
              Rent a room
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
