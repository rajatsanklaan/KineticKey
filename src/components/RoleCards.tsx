import type { Page } from '../types'
import './RoleCards.css'

type Props = {
  onNavigate: (page: Page) => void
}

const roles = [
  {
    page: 'listings' as const,
    title: 'Rent a room',
    text: 'Browse rooms by area, walking times and monthly rent.',
  },
  {
    page: 'owner' as const,
    title: 'For landlords',
    text: 'Add photos, Eircode, rent and nearby places, then publish.',
  },
  {
    page: 'signin' as const,
    title: 'Sign in',
    text: 'Manage your rooms or save listings you want to view.',
  },
]

export default function RoleCards({ onNavigate }: Props) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">What you can do</p>
          <h2>Built for tenants and landlords</h2>
        </div>
        <div className="role-grid">
          {roles.map((role) => (
            <button
              key={role.page}
              type="button"
              className="role-card"
              onClick={() => onNavigate(role.page)}
            >
              <h3>{role.title}</h3>
              <p>{role.text}</p>
              <span>Open page</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
