import type { FormEvent } from 'react'
import './SearchBar.css'

type Props = {
  onSearch?: () => void
}

export default function SearchBar({ onSearch }: Props) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch?.()
  }

  return (
    <form className="search-bar" onSubmit={submit}>
      <label className="search-field">
        <span>Area</span>
        <select defaultValue="Dublin 6" aria-label="Area">
          <option value="" disabled>
            Area or Eircode
          </option>
          <option>Dublin 6</option>
          <option>Dublin 8</option>
          <option>Dublin 7</option>
          <option>Cork City</option>
          <option>Galway City</option>
          <option>Limerick</option>
        </select>
      </label>

      <span className="search-divider" aria-hidden="true" />

      <label className="search-field">
        <span>Rooms in house</span>
        <select defaultValue="2+" aria-label="Rooms in the house">
          <option>Any</option>
          <option>1</option>
          <option>2+</option>
          <option>3+</option>
          <option>4+</option>
        </select>
      </label>

      <span className="search-divider" aria-hidden="true" />

      <label className="search-field">
        <span>Near by</span>
        <select defaultValue="Luas or DART" aria-label="Near by">
          <option>Luas or DART</option>
          <option>Supermarket</option>
          <option>Park</option>
          <option>Gym</option>
          <option>Pharmacy</option>
          <option>Bus corridor</option>
          <option>Hospital</option>
          <option>Cafés</option>
        </select>
      </label>

      <button className="search-submit" type="submit">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path
            d="M16 16 L20.5 20.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Show rooms
      </button>
    </form>
  )
}
