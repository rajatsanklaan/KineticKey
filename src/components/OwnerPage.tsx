import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import type { Page } from '../types'
import './OwnerPage.css'

type Props = {
  onNavigate: (page: Page) => void
}

type PhotoItem = {
  id: string
  url: string
  name: string
}

const roomTypes = ['Single', 'Double', 'Twin'] as const
const billOptions = ['Bills included', 'Bills extra'] as const
const featureOptions = ['Ensuite', 'Furnished', 'Desk', 'Garden', 'Parking'] as const
const nearbyChoices = [
  'Luas or DART',
  'Bus corridor',
  'Supermarket',
  'Park',
  'Gym',
  'Pharmacy',
  'Hospital',
  'Cafés',
  'University',
  'City centre',
] as const

function toggleItem(list: string[], item: string) {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item]
}

export default function OwnerPage({ onNavigate }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const nearbyRef = useRef<HTMLDivElement>(null)
  const photosRef = useRef<PhotoItem[]>([])

  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [eircode, setEircode] = useState('')
  const [areaFound, setAreaFound] = useState(false)
  const [areaLabel, setAreaLabel] = useState('')
  const [rent, setRent] = useState('')
  const [bills, setBills] = useState<(typeof billOptions)[number]>('Bills included')
  const [roomType, setRoomType] = useState<(typeof roomTypes)[number]>('Double')
  const [houseRooms, setHouseRooms] = useState(3)
  const [features, setFeatures] = useState<string[]>(['Ensuite', 'Furnished'])
  const [nearby, setNearby] = useState<string[]>([])
  const [nearbyOpen, setNearbyOpen] = useState(false)
  const [customNearby, setCustomNearby] = useState('')
  const [availableDate, setAvailableDate] = useState('')
  const [description, setDescription] = useState('')
  const [draftSaved, setDraftSaved] = useState(false)
  const [published, setPublished] = useState(false)

  useEffect(() => {
    photosRef.current = photos
  }, [photos])

  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url))
    }
  }, [])

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!nearbyRef.current?.contains(event.target as Node)) {
        setNearbyOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const completed = useMemo(() => {
    let count = 0
    if (photos.length > 0) count += 1
    if (areaFound && eircode.trim()) count += 1
    if (rent.trim()) count += 1
    if (roomType && houseRooms > 0) count += 1
    if (nearby.length > 0 && availableDate) count += 1
    return count
  }, [areaFound, availableDate, eircode, houseRooms, nearby.length, photos.length, rent, roomType])

  const progress = Math.round((completed / 5) * 100)

  function markDirty() {
    setDraftSaved(false)
    setPublished(false)
  }

  function openPicker() {
    fileRef.current?.click()
  }

  function onFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    if (!files.length) return

    const next = files.slice(0, 12).map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }))

    setPhotos((current) => [...current, ...next].slice(0, 12))
    markDirty()
    event.target.value = ''
  }

  function removePhoto(id: string) {
    setPhotos((current) => {
      const target = current.find((photo) => photo.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return current.filter((photo) => photo.id !== id)
    })
    markDirty()
  }

  function findArea() {
    const code = eircode.trim().toUpperCase()
    if (!code) {
      setAreaFound(false)
      setAreaLabel('')
      return
    }

    const prefix = code.replace(/\s+/g, '').slice(0, 3)
    const map: Record<string, string> = {
      D08: 'Portobello, Dublin 8',
      D06: 'Rathmines, Dublin 6',
      D07: 'Stoneybatter, Dublin 7',
      T12: 'Cork City',
      H91: 'Galway City',
      V94: 'Limerick City',
    }

    setAreaFound(true)
    setAreaLabel(map[prefix] ?? `Area for ${code}`)
    setDraftSaved(true)
  }

  function addCustomNearby() {
    const value = customNearby.trim()
    if (!value) return
    setNearby((list) => (list.includes(value) ? list : [...list, value]))
    setCustomNearby('')
    markDirty()
  }

  function saveDraft() {
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
          <div className="owner-top-copy">
            <p className="eyebrow">For landlords</p>
            <h1>Add a room</h1>
          </div>
          <span className={`owner-draft${draftSaved || published ? ' is-on' : ''}`}>
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

        <form className="owner-layout" onSubmit={publish}>
          <section className="owner-sec owner-photos-sec" aria-label="Photos">
            <div className="owner-sec-head">
              <div>
                <h2>Photos</h2>
                <p className="owner-hint">
                  First photo is the cover. Upload clear room photos — up to 12 images.
                </p>
              </div>
              <button className="btn btn-accent" type="button" onClick={openPicker}>
                Upload photos
              </button>
            </div>

            <input
              ref={fileRef}
              className="owner-file"
              type="file"
              accept="image/*"
              multiple
              onChange={onFilesSelected}
            />

            {photos.length === 0 ? (
              <button className="owner-dropzone" type="button" onClick={openPicker}>
                <span className="owner-dropzone-icon" aria-hidden="true">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 8h4l2-3h6l2 3h4v11H3z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
                <strong>Drop photos here or click to browse</strong>
                <span>JPG, PNG or WebP. First image becomes the cover.</span>
              </button>
            ) : (
              <div className="owner-photos">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className={`owner-photo${index === 0 ? ' is-cover' : ''}`}
                  >
                    <img src={photo.url} alt={photo.name} />
                    {index === 0 && <span className="owner-cover-badge">Cover</span>}
                    <button
                      className="owner-photo-remove"
                      type="button"
                      aria-label={`Remove ${photo.name}`}
                      onClick={() => removePhoto(photo.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {photos.length < 12 && (
                  <button className="owner-photo-add" type="button" onClick={openPicker}>
                    + Add more
                  </button>
                )}
              </div>
            )}
          </section>

          <div className="owner-grid">
            <section className="owner-sec" aria-label="Location">
              <h2>Where is it?</h2>
              <label className="owner-label" htmlFor="owner-eircode">
                Pincode / Eircode
              </label>
              <div className="owner-eircode-row">
                <input
                  id="owner-eircode"
                  className="owner-input"
                  value={eircode}
                  onChange={(event) => {
                    setEircode(event.target.value.toUpperCase())
                    setAreaFound(false)
                    markDirty()
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
                  Area filled in: {areaLabel}
                </p>
              )}
            </section>

            <section className="owner-sec" aria-label="Rent">
              <h2>Rent per month</h2>
              <label className="owner-label" htmlFor="owner-rent">
                Monthly rent
              </label>
              <div className="owner-rent">
                <span aria-hidden="true">€</span>
                <input
                  id="owner-rent"
                  inputMode="numeric"
                  value={rent}
                  placeholder="780"
                  onChange={(event) => {
                    setRent(event.target.value.replace(/[^\d]/g, ''))
                    markDirty()
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
                      markDirty()
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section className="owner-sec" aria-label="The room">
            <h2>The room</h2>
            <p className="owner-hint">Choose the room type, house size and what is included.</p>
            <div className="owner-seg">
              {roomTypes.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`owner-chip${roomType === option ? ' is-on' : ''}`}
                  aria-pressed={roomType === option}
                  onClick={() => {
                    setRoomType(option)
                    markDirty()
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
                    markDirty()
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
                    markDirty()
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
                    markDirty()
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          <section className="owner-sec" aria-label="Near by">
            <h2>Near by</h2>
            <p className="owner-hint">
              Open the list and tick what is close by. Use Other to add anything missing.
            </p>

            <div className="owner-nearby" ref={nearbyRef}>
              <button
                className={`owner-nearby-trigger${nearbyOpen ? ' is-open' : ''}`}
                type="button"
                aria-expanded={nearbyOpen}
                onClick={() => setNearbyOpen((value) => !value)}
              >
                <span>
                  {nearby.length
                    ? `${nearby.length} selected`
                    : 'Select nearby places'}
                </span>
                <svg width="14" height="8" viewBox="0 0 12 8" aria-hidden="true">
                  <path
                    d="M1 1.5 L6 6.5 L11 1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {nearbyOpen && (
                <div className="owner-nearby-menu">
                  {nearbyChoices.map((option) => {
                    const checked = nearby.includes(option)
                    return (
                      <label key={option} className="owner-check">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            setNearby((list) => toggleItem(list, option))
                            markDirty()
                          }}
                        />
                        <span>{option}</span>
                      </label>
                    )
                  })}

                  <div className="owner-nearby-other">
                    <p>Other</p>
                    <div className="owner-nearby-other-row">
                      <input
                        className="owner-input"
                        value={customNearby}
                        placeholder="e.g. Library 5 min"
                        onChange={(event) => setCustomNearby(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault()
                            addCustomNearby()
                          }
                        }}
                      />
                      <button className="btn btn-dark" type="button" onClick={addCustomNearby}>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {nearby.length > 0 && (
              <div className="owner-chip-wrap">
                {nearby.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="owner-chip is-on"
                    onClick={() => {
                      setNearby((list) => list.filter((value) => value !== item))
                      markDirty()
                    }}
                  >
                    {item} ×
                  </button>
                ))}
              </div>
            )}
          </section>

          <div className="owner-grid">
            <section className="owner-sec" aria-label="Availability">
              <h2>Available from</h2>
              <label className="owner-label" htmlFor="owner-date">
                Move-in date
              </label>
              <input
                id="owner-date"
                className="owner-input"
                type="date"
                value={availableDate}
                onChange={(event) => {
                  setAvailableDate(event.target.value)
                  markDirty()
                }}
              />
            </section>

            <section className="owner-sec" aria-label="Description">
              <h2>Description</h2>
              <label className="owner-label" htmlFor="owner-description">
                Anything a tenant should know
              </label>
              <textarea
                id="owner-description"
                className="owner-input owner-textarea"
                placeholder="Bills, house rules, who lives here, quiet hours..."
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value)
                  markDirty()
                }}
              />
            </section>
          </div>

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
