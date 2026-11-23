import { useEffect, useRef } from 'react'

// Subtle cyan glow that trails the (native) mouse pointer.
// Only on devices with a real mouse; skipped for reduced motion.
export default function Cursor() {
  const glowRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = glowRef.current
    if (!el) return

    let mx = -1000, my = -1000, gx = -1000, gy = -1000
    let raf = null

    const tick = () => {
      gx += (mx - gx) * 0.14
      gy += (my - gy) * 0.14
      el.style.transform = `translate(${gx - 200}px, ${gy - 200}px)`
      // stop the loop once the glow has caught up, so nothing runs while idle
      raf = Math.abs(mx - gx) + Math.abs(my - gy) > 0.5 ? requestAnimationFrame(tick) : null
    }
    const onMove = e => {
      if (gx === -1000) { gx = e.clientX; gy = e.clientY }
      mx = e.clientX
      my = e.clientY
      el.style.opacity = '1'
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => { el.style.opacity = '0' }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0, width: 400, height: 400,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0, opacity: 0,
        background: 'radial-gradient(circle, rgba(0,229,255,0.09) 0%, rgba(0,229,255,0.03) 40%, transparent 70%)',
        transition: 'opacity .4s', willChange: 'transform',
      }}
    />
  )
}
