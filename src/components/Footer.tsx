import type { Page } from '../types'
import './Footer.css'

type Props = {
  onNavigate: (page: Page) => void
}

export default function Footer({ onNavigate }: Props) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>KineticKey</strong>
          <p>Rooms in Ireland, listed by the people who own the door.</p>
        </div>
        <div>
          <p>Explore</p>
          <button type="button" onClick={() => onNavigate('listings')}>
            Rent a room
          </button>
          <button type="button" onClick={() => onNavigate('owner')}>
            For landlords
          </button>
        </div>
        <div>
          <p>Account</p>
          <button type="button" onClick={() => onNavigate('signin')}>
            Sign in
          </button>
          <button type="button" onClick={() => onNavigate('owner')}>
            List a room
          </button>
        </div>
      </div>
      <div className="container footer-copy">© 2026 KineticKey</div>
    </footer>
  )
}
