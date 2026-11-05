import type { Page } from '../types'
import './BothSides.css'

type Props = {
  onNavigate: (page: Page) => void
}

const trust = [
  { title: 'Real landlord photos', text: 'See the room before you ask for a viewing.' },
  { title: 'Eircode areas', text: 'Dublin 6, Cork, Galway, Limerick — filled from the code.' },
  { title: 'Walking times', text: 'Luas, shops, parks and more on every listing.' },
  { title: 'Stay on KineticKey', text: 'Enquire and book viewings without leaving the site.' },
]

const tenants = [
  'Filter by area, rooms in the house and monthly rent',
  'See bills included or bills extra upfront',
  'Read walking times before you shortlist',
  'Book a viewing when a room feels right',
]

const landlords = [
  'Add photos, Eircode, rent and room type in one flow',
  'Suggest nearby places tenants actually care about',
  'Save a draft, then publish when the listing is ready',
  'Get viewing requests from people already searching',
]

export default function BothSides({ onNavigate }: Props) {
  return (
    <section className="both-sides">
      <div className="container">
        <div className="section-head both-sides-head">
          <p className="eyebrow">For both sides</p>
          <h2>Clear rooms for tenants. Simple tools for landlords.</h2>
          <p className="muted">
            The same listing works both ways: honest details for people searching, and a
            straightforward CMS for people listing.
          </p>
        </div>

        <div className="both-trust">
          {trust.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="both-split">
          <article className="both-panel">
            <p className="eyebrow">Tenants</p>
            <h3>Find a room without the noise</h3>
            <p>
              Browse rooms across Ireland with the filters that matter — area, rent, bills and
              what is nearby on foot.
            </p>
            <ul>
              {tenants.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button className="btn btn-accent" type="button" onClick={() => onNavigate('listings')}>
              Rent a room
            </button>
          </article>

          <article className="both-panel both-panel-landlord">
            <p className="eyebrow">Landlords</p>
            <h3>List a room in minutes</h3>
            <p>
              Publish with cover photos, Eircode, monthly rent and walking times — then manage
              drafts and viewings from one place.
            </p>
            <ul>
              {landlords.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button className="btn btn-dark" type="button" onClick={() => onNavigate('owner')}>
              List a room
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}
