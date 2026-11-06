import type { Page } from '../types'
import './Stats.css'

type Props = {
  onNavigate: (page: Page) => void
}

const stats = [
  { value: '6', label: 'Rooms shown' },
  { value: '4', label: 'Irish cities' },
  { value: '€500–€900', label: 'Typical rent' },
  { value: 'Walk times', label: 'On every card' },
]

export default function Stats({ onNavigate }: Props) {
  return (
    <section className="stats">
      <div className="container">
        <button
          className="stats-owner-bar"
          type="button"
          onClick={() => onNavigate('owner')}
        >
          <span>Are you a landlord?</span>
          <span className="stats-owner-link">
            List a room for free
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        <div className="stats-row">
          {stats.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
