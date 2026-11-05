import { useRef, type MouseEvent } from 'react'
import type { Page } from '../types'
import { photos } from '../data/photos'
import HousePlaceholder from './HousePlaceholder'
import SearchBar from './SearchBar'
import './Hero.css'

const areas = ['Dublin 6', 'Dublin 8', 'Cork City', 'Galway City', 'Limerick'] as const

type Props = {
  onNavigate: (page: Page) => void
}

export default function Hero({ onNavigate }: Props) {
  const heroRef = useRef<HTMLElement>(null)

  function movePhoto(event: MouseEvent<HTMLElement>) {
    const box = heroRef.current
    if (!box) return

    const rect = box.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    box.style.setProperty('--tx', `${(x - 0.5) * 18}px`)
    box.style.setProperty('--ty', `${(y - 0.5) * 18}px`)
    box.style.setProperty('--mx', `${x * 100}%`)
    box.style.setProperty('--my', `${y * 100}%`)
    box.classList.add('is-active')
  }

  function resetPhoto() {
    const box = heroRef.current
    if (!box) return

    box.style.setProperty('--tx', '0px')
    box.style.setProperty('--ty', '0px')
    box.classList.remove('is-active')
  }

  return (
    <section
      className="hero"
      ref={heroRef}
      onMouseMove={movePhoto}
      onMouseLeave={resetPhoto}
    >
      <div className="hero-visual">
        <HousePlaceholder label="Featured room photo" fileName={photos.hero} />
      </div>
      <div className="hero-shade" />
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow">Rooms across Ireland</p>
          <h1>Rooms in Ireland, listed by the people who own the door.</h1>
          <p className="hero-lead">
            Real photos from landlords, with walking times to the Luas, shops and the park.
          </p>
          <div className="hero-search">
            <SearchBar onSearch={() => onNavigate('listings')} />
          </div>
          <div className="hero-cities">
            {areas.map((area) => (
              <button key={area} type="button" onClick={() => onNavigate('listings')}>
                {area}
              </button>
            ))}
          </div>
          <div className="hero-actions">
            <button className="btn btn-ghost" type="button" onClick={() => onNavigate('owner')}>
              List a room
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
