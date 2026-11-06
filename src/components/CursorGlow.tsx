import { useEffect, useRef } from 'react'
import './CursorGlow.css'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    function move(event: MouseEvent) {
      glow.style.setProperty('--x', `${event.clientX}px`)
      glow.style.setProperty('--y', `${event.clientY}px`)
    }

    function hoverOn(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return
      const hot = target.closest('button, a, input, select, textarea, .hero-visual')
      glow.classList.toggle('is-hot', Boolean(hot))
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', hoverOn, { passive: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', hoverOn)
    }
  }, [])

  return (
    <div className="cursor-glow" ref={glowRef} aria-hidden="true">
      <span className="cursor-glow-core" />
    </div>
  )
}
