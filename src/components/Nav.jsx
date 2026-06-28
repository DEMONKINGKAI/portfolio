import { useEffect, useState } from 'react'

const links = [
  { label: 'about', href: '#about' },
  { label: 'work', href: '#work' },
  { label: 'experience', href: '#experience' },
  { label: 'focus', href: '#focus' },
  { label: 'contact', href: '#contact' },
]

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Nav({ dark, onToggleDark }) {
  const [active, setActive]   = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const onChange = e => { setIsMobile(e.matches); setMenuOpen(false) }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = links.map(l => document.querySelector(l.href))
      let current = ''
      sections.forEach(s => {
        if (s && window.scrollY >= s.offsetTop - 100) current = '#' + s.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--bg)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid var(--line)',
        transition: 'background 0.2s',
      }}
    >
      <nav
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: 14,
            color: 'var(--ink)',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            flexShrink: 0,
          }}
        >
          archit.sharma
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {!isMobile && (
            <ul style={{ display: 'flex', gap: 28, listStyle: 'none', margin: 0, padding: 0 }}>
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      fontWeight: active === l.href ? 500 : 400,
                      color: active === l.href ? 'var(--accent)' : 'var(--muted)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                      padding: '4px 0',
                      borderBottom: active === l.href ? '1px solid var(--accent)' : '1px solid transparent',
                    }}
                    onMouseEnter={e => { if (active !== l.href) e.target.style.color = 'var(--ink)' }}
                    onMouseLeave={e => { if (active !== l.href) e.target.style.color = 'var(--muted)' }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <button
            className="theme-toggle"
            onClick={onToggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          {isMobile && (
            <button
              className="theme-toggle"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          )}
        </div>
      </nav>

      {isMobile && menuOpen && (
        <div className="mobile-menu">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: active === l.href ? 'var(--accent)' : 'var(--muted)', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'block', transition: 'color 0.15s' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
