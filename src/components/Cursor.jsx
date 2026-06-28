import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const posRef  = useRef(null)  // position wrapper — no visual
  const ringRef = useRef(null)  // shape div inside posRef

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    let mx = -300, my = -300
    let rx = -300, ry = -300
    let vx = 0, vy = 0
    let hovering = false
    let clicking = false
    let visible = false
    let raf

    const show = () => {
      if (visible) return
      visible = true
      dotRef.current.style.opacity  = '1'
      posRef.current.style.opacity  = '1'
    }
    const hide = () => {
      visible = false
      dotRef.current.style.opacity  = '0'
      posRef.current.style.opacity  = '0'
    }

    const onMove = e => {
      // velocity: difference from last known mouse position
      vx = (e.clientX - mx) * 0.65
      vy = (e.clientY - my) * 0.65
      mx = e.clientX
      my = e.clientY
      hovering = !!e.target.closest('a, button, [role="button"], [tabindex]')
      show()
    }
    const onDown = () => { clicking = true }
    const onUp   = () => { clicking = false }
    const onLeave = () => hide()

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    document.addEventListener('mouseleave', onLeave)

    const tick = () => {
      // lerp ring toward mouse
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12

      // decay velocity
      vx *= 0.78
      vy *= 0.78

      const speed   = Math.sqrt(vx * vx + vy * vy)
      const stretch = hovering || clicking
        ? 1
        : Math.min(1 + speed * 0.055, 2.6)
      const angle   = speed > 0.5
        ? Math.atan2(vy, vx) * 180 / Math.PI
        : 0

      // Dot: snaps instantly to mouse
      if (dotRef.current) {
        const ds = hovering ? 0 : clicking ? 2.5 : 1
        dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px) scale(${ds})`
        dotRef.current.style.background = hovering ? 'transparent' : 'var(--accent)'
      }

      // Position wrapper: lerped
      if (posRef.current)
        posRef.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`

      // Shape: stretches + rotates, crosshair fills on hover
      if (ringRef.current) {
        const ringScale = clicking ? 0.7 : hovering ? 0.55 : 1
        ringRef.current.style.transform = `rotate(${angle}deg) scaleX(${stretch}) scale(${ringScale})`
        ringRef.current.style.background = hovering
          ? 'var(--accent-soft)'
          : 'transparent'
        ringRef.current.style.borderColor = hovering || clicking
          ? 'var(--accent)'
          : 'var(--accent)'
        ringRef.current.style.opacity = hovering ? '0.85' : '0.7'
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Precise inner dot — zero lag */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'var(--accent)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'background 0.15s, transform 0.08s',
        }}
      />

      {/* Position wrapper */}
      <div
        ref={posRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 40, height: 40,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
        }}
      >
        {/* Shape: stretches with velocity */}
        <div
          ref={ringRef}
          style={{
            width: 40, height: 40,
            borderRadius: '50%',
            border: '1.5px solid var(--accent)',
            opacity: 0.7,
            transformOrigin: '50% 50%',
            transition: 'background 0.2s, border-color 0.15s, opacity 0.2s',
            willChange: 'transform',
          }}
        />
      </div>
    </>
  )
}
