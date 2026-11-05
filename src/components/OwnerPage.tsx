import { useMemo, useState, type FormEvent } from 'react'
import type { Page } from '../types'
import './OwnerPage.css'

type Props = {
  onNavigate: (page: Page) => void
}

const roomTypes = ['Single', 'Double', 'Twin'] as const
const billOptions = ['Bills included', 'Bills extra'] as const
const availableOptions = ['Now', '1 Dec', 'Pick date'] as const
const featureOptions = ['Ensuite', 'Furnished', 'Desk', 'Garden', 'Parking'] as const
const nearbyOptions = [
  'Luas 4 min',
  'Tesco 2 min',
  'Park 6 min',
  'Gym',
  'Pharmacy',
  '+ Other',
] as const

function toggleItem(list: string[], item: string) {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item]
}

export default function OwnerPage({ onNavigate }: Props) {
  const [eircode, setEircode] = useState('D08 XXXX')
  const [areaFound, setAreaFound] = useState(true)
  const [rent, setRent] = useState('780')
  const [bills, setBills] = useState<(typeof billOptions)[number]>('Bills included')
  const [roomType, setRoomType] = useState<(typeof roomTypes)[number]>('Double')
  const [houseRooms, setHouseRooms] = useState(3)
  const [features, setFeatures] = useState<string[]>(['Ensuite', 'Furnished'])
  const [nearby, setNearby] = useState<string[]>(['Luas 4 min', 'Tesco 2 min', 'Park 6 min'])
  const [available, setAvailable] = useState<(typeof availableOptions)[number]>('1 Dec')
  const [description, setDescription] = useState('')
  const [draftSaved, setDraftSaved] = useState(true)
  const [published, setPublished] = useState(false)

  const completed = useMemo(() => {
    let count = 1 // photos section is present
    if (areaFound && eircode.trim()) count += 1
    if (rent.trim()) count += 1
    if (roomType && houseRooms > 0) count += 1
    if (nearby.length > 0 && available) count += 1
    return count
  }, [areaFound, available, eircode, houseRooms, nearby.length, rent, roomType])

  const progress = Math.round((completed / 5) * 100)

  function findArea() {
    setAreaFound(Boolean(eircode.trim()))
    setDraftSaved(true)
  }

  function saveDraft(event?: FormEvent) {
    event?.preventDefault()
    setDraftSaved(true)
    setPublished(false)
  }

  function publish(event: FormEvent) {
    event.preventDefault()
    setDraftSaved(true)
    setPublished(true)
  }

  return (
    <div className="page owner-page">
      <div className="container owner-shell">
        <header className="owner-top">
          <button
            className="owner-back"
            type="button"
            aria-label="Back"
            onClick={() => onNavigate('home')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1>Add a room</h1>
          <span className={`owner-draft${draftSaved ? ' is-on' : ''}`}>
            {published ? 'Published' : draftSaved ? 'Draft saved' : 'Unsaved'}
          </span>
        </header>

        <div className="owner-progress">
          <div className="owner-progress-row">
            <span>Listing is {progress}% ready</span>
            <span>{completed} of 5 sections</span>
          </div>
          <div className="owner-progress-track" aria-hidden="true">
            <div className="owner-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <form className="owner-stack" onSubmit={publish}>
          <section className="owner-sec" aria-label="Photos">
            <h2>Photos</h2>
            <p className="owner-hint">First photo is the cover. Five or more get more enquiries.</p>
            <div className="owner-photos">
              <div className="owner-tile owner-cover">
                Cover
                <span>Cover</span>
              </div>
              <div className="owner-tile owner-photo-2">Photo 2</div>
              <div className="owner-tile owner-photo-3">Photo 3</div>
              <button className="owner-add-gallery" type="button">
                + Add from gallery
              </button>
              <button className="owner-camera" type="button" aria-label="Take a photo">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h4l2-3h6l2 3h4v11H3z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="2" />
                </svg>
                Camera
              </button>
            </div>
          </section>

          <section className="owner-sec" aria-label="Location">
            <h2>Where is it?</h2>
            <label className="owner-hint" htmlFor="owner-eircode">
              Eircode
            </label>
            <div className="owner-eircode-row">
              <input
                id="owner-eircode"
                className="owner-input"
                value={eircode}
                onChange={(event) => {
                  setEircode(event.target.value)
                  setAreaFound(false)
                  setDraftSaved(false)
                }}
                placeholder="D08 XXXX"
              />
              <button className="owner-find" type="button" onClick={findArea}>
                Find
              </button>
            </div>
            {areaFound && (
              <p className="owner-area-ok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Area filled in: Portobello, Dublin 8
              </p>
            )}
          </section>

          <section className="owner-sec" aria-label="Rent">
            <h2>Rent per month</h2>
            <div className="owner-rent">
              <span aria-hidden="true">€</span>
              <label className="sr-only" htmlFor="owner-rent">
                Rent per month in euro
              </label>
              <input
                id="owner-rent"
                inputMode="numeric"
                value={rent}
                onChange={(event) => {
                  setRent(event.target.value.replace(/[^\d]/g, ''))
                  setDraftSaved(false)
                }}
              />
            </div>
            <div className="owner-seg">
              {billOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`owner-chip${bills === option ? ' is-on' : ''}`}
                  aria-pressed={bills === option}
                  onClick={() => {
                    setBills(option)
                    setDraftSaved(false)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          <section className="owner-sec" aria-label="The room">
            <h2>The room</h2>
            <div className="owner-seg">
              {roomTypes.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`owner-chip${roomType === option ? ' is-on' : ''}`}
                  aria-pressed={roomType === option}
                  onClick={() => {
                    setRoomType(option)
                    setDraftSaved(false)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="owner-stepper">
              <span>Rooms in the house</span>
              <div>
                <button
                  className="owner-step"
                  type="button"
                  aria-label="Fewer rooms"
                  onClick={() => {
                    setHouseRooms((value) => Math.max(1, value - 1))
                    setDraftSaved(false)
                  }}
                >
                  −
                </button>
                <strong>{houseRooms}</strong>
                <button
                  className="owner-step"
                  type="button"
                  aria-label="More rooms"
                  onClick={() => {
                    setHouseRooms((value) => Math.min(8, value + 1))
                    setDraftSaved(false)
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="owner-chip-wrap">
              {featureOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`owner-chip${features.includes(option) ? ' is-on' : ''}`}
                  aria-pressed={features.includes(option)}
                  onClick={() => {
                    setFeatures((list) => toggleItem(list, option))
                    setDraftSaved(false)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          <section className="owner-sec" aria-label="Near by">
            <h2>Near by</h2>
            <p className="owner-hint">Suggested from the Eircode. Tap to remove or add.</p>
            <div className="owner-chip-wrap">
              {nearbyOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`owner-chip${nearby.includes(option) ? ' is-on' : ''}`}
                  aria-pressed={nearby.includes(option)}
                  onClick={() => {
                    setNearby((list) => toggleItem(list, option))
                    setDraftSaved(false)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          <section className="owner-sec" aria-label="Availability">
            <h2>Available from</h2>
            <div className="owner-seg">
              {availableOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`owner-chip${available === option ? ' is-on' : ''}`}
                  aria-pressed={available === option}
                  onClick={() => {
                    setAvailable(option)
                    setDraftSaved(false)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <label className="owner-hint" htmlFor="owner-description">
              Description (optional)
            </label>
            <textarea
              id="owner-description"
              className="owner-input owner-textarea"
              placeholder="Anything a tenant should know"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value)
                setDraftSaved(false)
              }}
            />
          </section>

          {published && (
            <p className="owner-success">Room published. Tenants can now find it in Rent a room.</p>
          )}

          <div className="owner-actions">
            <button className="btn btn-line owner-draft-btn" type="button" onClick={saveDraft}>
              Save draft
            </button>
            <button className="btn btn-accent owner-publish-btn" type="submit">
              Publish room
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
