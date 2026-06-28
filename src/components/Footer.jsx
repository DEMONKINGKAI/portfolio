import { Mail, FileText, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useState } from 'react'

const links = [
  { icon: GithubIcon,   label: 'GitHub',      href: 'https://github.com/DEMONKINGKAI' },
  { icon: LinkedinIcon, label: 'LinkedIn',    href: 'https://www.linkedin.com/in/archit-sharma-work/' },
  { icon: Mail,         label: 'Email',        href: 'mailto:sharmarchit.work@gmail.com' },
  { icon: FileText,     label: 'CV',          href: '/cv.pdf' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const copyEmail = e => {
    e.preventDefault()
    navigator.clipboard.writeText('sharmarchit.work@gmail.com').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <footer
      id="contact"
      style={{
        padding: '64px 24px',
        maxWidth: 1100,
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -10,
          left: -10,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(72px, 16vw, 160px)',
          letterSpacing: '-0.04em',
          color: 'var(--ink)',
          opacity: 0.03,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        archit.sharma
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 48,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 48,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              margin: '0 0 10px',
            }}
          >
            Get in touch
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: 'var(--muted)',
              maxWidth: 380,
              lineHeight: 1.6,
              margin: '0 0 24px',
            }}
          >
            Open to full-time roles in AI/ML engineering, causal inference, and applied generative AI.
            Currently based in Germany, graduating mid-2026.
          </p>
          <a
            href="mailto:sharmarchit.work@gmail.com"
            className="link-underline"
            onClick={copyEmail}
            title="Click to copy"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: 'var(--accent)',
              transition: 'opacity 0.2s',
            }}
          >
            {copied ? '✓ copied to clipboard' : 'sharmarchit.work@gmail.com'}
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {links.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') || href === '/cv.pdf' ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              <Icon size={13} />
              {label}
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
            paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--faint)',
          }}
        >
          archit.sharma
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--faint)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <MapPin size={11} /> Based in Germany
        </span>
      </div>
    </footer>
  )
}
