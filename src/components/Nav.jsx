import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'

const links = [
  { label: 'about', href: '#about' },
  { label: 'now', href: '#now' },
  { label: 'work', href: '#work' },
  { label: 'experience', href: '#experience' },
  { label: 'toolkit', href: '#toolkit' },
  { label: 'contact', href: '#contact' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      let current = ''
      links.forEach(l => {
        const s = document.querySelector(l.href)
        if (s && window.scrollY >= s.offsetTop - 120) current = l.href
      })
      setActive(current)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'var(--nav-bg-scrolled)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
        transition: 'background .2s, border-color .2s',
      }}
    >
      <nav className="wrap" style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <a href="#top" className="mono" style={{ fontSize: 13.5, color: 'var(--ink)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--cy)' }}>❯</span>
          <span>kai<span className="faint">@</span><span style={{ color: 'var(--am)' }}>darmstadt</span><span className="faint">:~</span></span>
          <span className="caret" style={{ width: 7, height: 14 }} />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <ul className="hide-sm" style={{ display: 'flex', gap: 24, listStyle: 'none', margin: 0, padding: 0 }}>
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="mono"
                  style={{
                    fontSize: 12, textDecoration: 'none', transition: 'color .15s',
                    color: active === l.href ? 'var(--cy)' : 'var(--muted)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = active === l.href ? 'var(--cy)' : 'var(--muted)' }}
                >
                  <span style={{ color: 'var(--faint)' }}>{String(i + 1).padStart(2, '0')}.</span>{l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/Archit_Sharma_CV.pdf" className="btn hide-sm" style={{ padding: '7px 12px', fontSize: 12, '--bc': 'var(--am)' }}>
            <FileText size={13} /> CV
          </a>
          <button
            className="btn show-sm"
            style={{ padding: '7px 10px' }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu show-sm">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              <span className="cy">❯ </span>{l.label}
            </a>
          ))}
          <a href="/Archit_Sharma_CV.pdf"><span className="am">❯ </span>CV (PDF)</a>
        </div>
      )}
    </header>
  )
}
