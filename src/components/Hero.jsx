import { Mail, FileText, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import CausalDAG from './CausalDAG'
import { useEffect, useState } from 'react'

const primaryLinks = [
  { icon: GithubIcon,   label: 'GitHub',   href: 'YOUR_GITHUB_URL' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'YOUR_LINKEDIN_URL' },
  { icon: Mail,         label: 'Email',    href: 'mailto:YOUR_EMAIL' },
  { icon: FileText,     label: 'CV',       href: '/cv.pdf' },
]

export default function Hero() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setMobile(mq.matches)
    const handler = e => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <section
      id="top"
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: mobile ? '48px 24px 64px' : '72px 24px 96px',
        display: 'flex',
        flexDirection: mobile ? 'column' : 'row',
        alignItems: 'center',
        gap: mobile ? 48 : 0,
      }}
    >
      {/* Left: text */}
      <div style={{ flex: '1 1 0', minWidth: 0 }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--accent)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          ● currently: MSc AI/ML · building Threadfall
        </p>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: mobile ? 40 : 56,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            margin: '0 0 8px',
          }}
        >
          Archit Sharma
        </h1>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: 'var(--muted)',
            marginBottom: 24,
            letterSpacing: '0.01em',
          }}
        >
          AI / ML Engineer — causal systems &amp; applied generative AI
        </p>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            lineHeight: 1.65,
            color: 'var(--muted)',
            maxWidth: 480,
            marginBottom: 32,
          }}
        >
          I work at the seam between probabilistic causal models and large language models —
          deterministic, reasoned state where it matters, generation only where it helps.
          The LLM narrates; the causal engine decides.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 32,
          }}
        >
          <MapPin size={13} color="var(--faint)" />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: 'var(--faint)',
            }}
          >
            Based in Germany
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {primaryLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') || href === '/cv.pdf' ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '8px 16px',
                border: '1px solid var(--line)',
                borderRadius: 6,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: 'var(--ink)',
                textDecoration: 'none',
                background: 'var(--surface)',
                transition: 'border-color 0.15s, color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.background = 'var(--accent-soft)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--line)'
                e.currentTarget.style.color = 'var(--ink)'
                e.currentTarget.style.background = 'var(--surface)'
              }}
            >
              <Icon size={14} />
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Right: DAG */}
      <div
        style={{
          flex: '0 0 auto',
          width: mobile ? '100%' : 480,
          height: mobile ? 220 : 340,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-hidden="false"
      >
        <CausalDAG mobile={mobile} />
      </div>
    </section>
  )
}
