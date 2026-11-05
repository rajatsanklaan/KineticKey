import type { Page } from '../types'
import './LandlordPitch.css'

type Props = {
  onNavigate: (page: Page) => void
}

export default function LandlordPitch({ onNavigate }: Props) {
  return (
    <section className="landlord-pitch">
      <div className="container landlord-pitch-inner">
        <div className="landlord-pitch-copy">
          <h2>Don&apos;t settle for less — fill your empty room faster.</h2>
          <p className="landlord-pitch-lead">
            If you could get more serious enquiries on your room, why wouldn&apos;t you? Let
            KineticKey help.
          </p>
          <p className="landlord-pitch-body">
            List with clear photos, Eircode areas and walking times — so tenants in Dublin,
            Cork, Galway and Limerick can find you and book a viewing.
          </p>

          <div className="landlord-pitch-actions">
            <button type="button" className="landlord-pitch-link" onClick={() => onNavigate('owner')}>
              See how listing works ↓
            </button>
            <button
              type="button"
              className="btn landlord-pitch-cta"
              onClick={() => onNavigate('owner')}
            >
              List a room
            </button>
            <button type="button" className="landlord-pitch-link" onClick={() => onNavigate('signin')}>
              Sign in to manage rooms
            </button>
          </div>
        </div>

        <div className="landlord-phones" aria-hidden="true">
          <article className="phone phone-left">
            <div className="phone-notch" />
            <div className="phone-screen">
              <header className="phone-bar">Enquiries</header>
              <div className="phone-pad">
                <p className="phone-label">Tenant interest</p>
                <ul className="phone-stars">
                  {[
                    ['Photos', 5],
                    ['Location', 5],
                    ['Response', 4],
                    ['Value', 5],
                  ].map(([label, score]) => (
                    <li key={String(label)}>
                      <span>{label}</span>
                      <span className="phone-star-row">
                        {Array.from({ length: Number(score) }, (_, i) => (
                          <i key={i} />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="phone-card">
                  <strong>Upcoming viewing</strong>
                  <p>Aoife B. · Portobello</p>
                  <span>Sat 14:00 · Double room</span>
                </div>
              </div>
            </div>
          </article>

          <article className="phone phone-center">
            <div className="phone-notch" />
            <div className="phone-screen">
              <header className="phone-bar">Performance</header>
              <div className="phone-pad">
                <p className="phone-label">Views this month</p>
                <div className="phone-bars">
                  {[40, 55, 48, 70, 62, 88].map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <p className="phone-label">Listing status</p>
                <div className="phone-ring-wrap">
                  <div className="phone-ring" />
                  <div className="phone-ring-copy">
                    <strong>82%</strong>
                    <span>Filled</span>
                  </div>
                </div>
                <ul className="phone-legend">
                  <li>
                    <i className="on" /> Occupied 82%
                  </li>
                  <li>
                    <i className="off" /> Vacant 18%
                  </li>
                </ul>
              </div>
            </div>
          </article>

          <article className="phone phone-right">
            <div className="phone-notch" />
            <div className="phone-screen">
              <header className="phone-bar">Calendar</header>
              <div className="phone-pad">
                <p className="phone-label">December</p>
                <div className="phone-cal">
                  {Array.from({ length: 28 }, (_, i) => {
                    const day = i + 1
                    const booked = [1, 2, 8, 9, 14, 15, 21].includes(day)
                    return (
                      <span key={day} className={booked ? 'is-booked' : undefined}>
                        {day}
                      </span>
                    )
                  })}
                </div>
                <div className="phone-card">
                  <strong>Current booking</strong>
                  <p>Declan R. · Rathmines</p>
                  <span>€690 / month</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
