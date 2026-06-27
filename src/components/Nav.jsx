import { useEffect, useState } from 'react'

const links = [
  { label: 'about', href: '#about' },
  { label: 'work', href: '#work' },
  { label: 'experience', href: '#experience' },
  { label: 'focus', href: '#focus' },
  { label: 'contact', href: '#contact' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

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
        background: scrolled ? 'rgba(248,248,251,0.92)' : 'var(--bg)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid var(--line)',
        transition: 'background 0.2s, backdrop-filter 0.2s',
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
          }}
        >
          archit.sharma
        </a>

        <ul
          style={{
            display: 'flex',
            gap: 28,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
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
      </nav>
    </header>
  )
}
