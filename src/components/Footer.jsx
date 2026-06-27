import { Mail, FileText, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

const links = [
  { icon: GithubIcon,   label: 'GitHub',      href: 'YOUR_GITHUB_URL' },
  { icon: LinkedinIcon, label: 'LinkedIn',    href: 'YOUR_LINKEDIN_URL' },
  { icon: Mail,         label: 'YOUR_EMAIL',  href: 'mailto:YOUR_EMAIL' },
  { icon: FileText,     label: 'CV',          href: '/cv.pdf' },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        borderTop: '1px solid var(--line)',
        padding: '64px 24px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
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
            href="mailto:YOUR_EMAIL"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: 'var(--accent)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--accent)',
              paddingBottom: 2,
            }}
          >
            YOUR_EMAIL
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
          borderTop: '1px solid var(--line)',
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
