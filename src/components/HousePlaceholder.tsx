import { useState } from 'react'
import { photoSrc } from '../data/photos'
import './HousePlaceholder.css'

type Props = {
  label?: string
  fileName?: string
}

export default function HousePlaceholder({
  label = 'House photo placeholder',
  fileName,
}: Props) {
  const [missing, setMissing] = useState(false)

  if (fileName && !missing) {
    return (
      <img
        className="house-photo"
        src={photoSrc(fileName)}
        alt={label}
        onError={() => setMissing(true)}
      />
    )
  }

  return (
    <div className="house-placeholder" aria-label={label}>
      <svg viewBox="0 0 64 64" width="42" height="42" aria-hidden="true">
        <path
          d="M8 30 L32 12 L56 30 V52 H8 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <rect x="26" y="36" width="12" height="16" fill="currentColor" opacity="0.35" />
      </svg>
      <span>Add photo in /photos</span>
    </div>
  )
}
