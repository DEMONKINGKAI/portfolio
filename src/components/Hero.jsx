import { Mail, FileText, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import CausalDAG from './CausalDAG'
import { useEffect, useState, useRef } from 'react'

const primaryLinks = [
  { icon: GithubIcon,   label: 'GitHub',   href: 'https://github.com/DEMONKINGKAI' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/archit-sharma-work/' },
  { icon: Mail,         label: 'Email',    href: 'mailto:sharmarchit.work@gmail.com' },
  { icon: FileText,     label: 'CV',       href: '/cv.pdf' },
]

const TAGLINES = [
  'AI / ML Engineer — causal · generative · multimodal · RL',
  'building systems that reason, adapt, and see',
  'MSc AI/ML · based in Germany',
]

const MOBILE_STACKS = [
  { name: 'Threadfall',   skills: ['Python', 'FastAPI', 'pgmpy', 'React', 'Tailwind'] },
  { name: 'Causeway',     skills: ['DoWhy', 'networkx', 'SciPy', 'matplotlib'] },
  { name: 'NeuMF',        skills: ['PyTorch', 'FastAPI', 'sent.transformers', 'Pandas'] },
  { name: 'Loan Dataset', skills: ['sklearn', 'Kaggle'] },
  { name: 'Loan Model',   skills: ['XGBoost', 'Seaborn', 'sklearn'] },
]

function MobileDAG() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      {MOBILE_STACKS.map(g => (
        <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--ink)', fontWeight: 500, minWidth: 76 }}>
            {g.name}
          </span>
          <span style={{ color: 'var(--faint)', fontSize: 11 }}>→</span>
          {g.skills.map(s => (
            <span key={s} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: '2px 7px', borderRadius: 3, border: '1px solid var(--line)', color: 'var(--muted)', background: 'var(--surface)' }}>
              {s}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const [mobile, setMobile] = useState(false)
  const [taglineIdx, setTaglineIdx] = useState(0)
  const [taglineFade, setTaglineFade] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setMobile(mq.matches)
    const handler = e => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTaglineFade(false)
      setTimeout(() => {
        setTaglineIdx(i => (i + 1) % TAGLINES.length)
        setTaglineFade(true)
      }, 300)
    }, 3200)
    return () => clearInterval(timerRef.current)
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
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 12px',
            borderRadius: 999,
            border: '1px solid rgba(77,61,247,0.22)',
            background: 'var(--accent-soft)',
            marginBottom: 20,
          }}
        >
          <span style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'statusPulse 2.4s ease-in-out infinite',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--accent)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            MSc AI/ML · building Threadfall
          </span>
        </span>

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
            opacity: taglineFade ? 1 : 0,
            transition: 'opacity 0.3s ease',
            minHeight: '1.4em',
          }}
        >
          {TAGLINES[taglineIdx]}
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
          I build AI systems across the full spectrum — causal inference, generative models,
          computer vision, multimodal LLMs, and reinforcement learning. My focus is on
          architectures where reasoning is explicit and decisions are traceable, not emergent
          side-effects of scale.
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
          height: mobile ? 260 : 520,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-hidden="false"
      >
        {mobile ? <MobileDAG /> : <CausalDAG />}
      </div>
    </section>
  )
}
