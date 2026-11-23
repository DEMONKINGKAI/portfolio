import Runner from './Runner'
import { Mail, FileText, ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useEffect, useRef, useState } from 'react'

const primaryLinks = [
  { icon: GithubIcon,   label: 'GitHub',   href: 'https://github.com/DEMONKINGKAI', c: 'var(--vi)' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/archit-sharma-work/', c: 'var(--cy)' },
  { icon: Mail,         label: 'Email',    href: 'mailto:sharmarchit.work@gmail.com', c: 'var(--am)' },
]

const STATS = [
  { c: 'var(--cy)', big: '422k', small: 'FDA reports, causal discovery' },
  { c: 'var(--vi)', big: '895',  small: 'node Bayesian network, ECE 0.0036' },
  { c: 'var(--am)', big: '99%',  small: 'precision, decision extraction' },
]

const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useTyped(text, delay = 0, speed = 45) {
  const [n, setN] = useState(REDUCED ? text.length : 0)
  useEffect(() => {
    if (REDUCED) return
    let i = 0, iv
    const t = setTimeout(() => {
      iv = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(iv) }, speed)
    }, delay)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [text, delay, speed])
  return text.slice(0, n)
}

/* ── Interactive do(x) "graph surgery" panel ─────────────────────────── */
const P = { Z: [190, 80], X: [80, 210], Y: [300, 210] }
const HS = 20

function seg(a, b, pad = HS + 8) {
  const [x1, y1] = P[a], [x2, y2] = P[b]
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy)
  return { x1: x1 + dx / L * pad, y1: y1 + dy / L * pad, x2: x2 - dx / L * pad, y2: y2 - dy / L * pad }
}

function DoPanel() {
  const [doX, setDoX] = useState(false)
  const [auto, setAuto] = useState(!REDUCED)

  useEffect(() => {
    if (!auto) return
    const iv = setInterval(() => setDoX(d => !d), 3600)
    return () => clearInterval(iv)
  }, [auto])

  const zx = seg('Z', 'X'), zy = seg('Z', 'Y'), xy = seg('X', 'Y')
  const mid = { x: (zx.x1 + zx.x2) / 2, y: (zx.y1 + zx.y2) / 2 }

  const node = (k, label, color, glow) => {
    const [x, y] = P[k]
    return (
      <g key={k}>
        <rect x={x - HS} y={y - HS} width={HS * 2} height={HS * 2} fill="var(--bg)" stroke={color} strokeWidth="2"
          style={{ filter: glow ? `drop-shadow(0 0 8px ${color})` : 'none', transition: 'all .4s' }} />
        <text x={x} y={y + 6} textAnchor="middle" fontFamily="var(--mono)" fontWeight="700" fontSize="17" fill="var(--ink)">{k}</text>
        <text x={x} y={k === 'Z' ? y - HS - 9 : y + HS + 18} textAnchor="middle" fontFamily="var(--mono)" fontSize="10.5" fill="var(--muted)">{label}</text>
      </g>
    )
  }

  return (
    <div className="panel runner" style={{ '--rc': doX ? 'var(--am)' : 'var(--cy)', '--rd': '6s', width: '100%', maxWidth: 440 }}>
      <Runner />
      <div className="term-bar">
        <span>causal_graph.surgery()</span>
        <span style={{ marginLeft: 'auto', width: 8, height: 8, background: 'var(--vi)', animation: 'statusPulse 1.6s infinite' }} />
      </div>
      <svg viewBox="0 0 380 270" width="100%" role="img" aria-label="Interactive causal graph: Z confounds X and Y; intervening with do(x) cuts the Z to X edge.">
        <defs>
          {['cy', 'am', 'faint'].map(c => (
            <marker key={c} id={`ah-${c}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={`var(--${c})`} />
            </marker>
          ))}
        </defs>
        {/* Z → X : the backdoor edge that do(x) severs */}
        <line {...zx} stroke={doX ? 'var(--faint)' : 'var(--cy)'} strokeWidth="1.6"
          strokeDasharray={doX ? '4 5' : 'none'} markerEnd={doX ? 'url(#ah-faint)' : 'url(#ah-cy)'}
          style={{ opacity: doX ? 0.45 : 1, transition: 'all .4s' }} />
        {doX && (
          <g transform={`translate(${mid.x} ${mid.y})`}>
            <line x1="-9" y1="-9" x2="9" y2="9" stroke="var(--vi)" strokeWidth="2.5" />
            <line x1="9" y1="-9" x2="-9" y2="9" stroke="var(--vi)" strokeWidth="2.5" />
          </g>
        )}
        <line {...zy} stroke="var(--cy)" strokeWidth="1.6" markerEnd="url(#ah-cy)" />
        <line {...xy} stroke={doX ? 'var(--am)' : 'var(--cy)'} strokeWidth={doX ? 2.4 : 1.6}
          markerEnd={doX ? 'url(#ah-am)' : 'url(#ah-cy)'} style={{ transition: 'all .4s', filter: doX ? 'drop-shadow(0 0 4px var(--am))' : 'none' }} />
        {node('Z', 'confounder', 'var(--cy)', false)}
        {node('X', 'treatment', doX ? 'var(--am)' : 'var(--cy)', doX)}
        {node('Y', 'outcome', doX ? 'var(--am)' : 'var(--cy)', doX)}
        {doX && (
          <g>
            <rect x={P.X[0] - 30} y={P.X[1] - HS - 30} width="60" height="20" fill="rgba(255,176,32,.12)" stroke="var(--am)" />
            <text x={P.X[0]} y={P.X[1] - HS - 16} textAnchor="middle" fontFamily="var(--mono)" fontWeight="700" fontSize="12" fill="var(--am)">do(x)</text>
          </g>
        )}
        <text x="225" y="74" fontFamily="var(--mono)" fontSize="10.5" fill="var(--muted)">
          {doX ? 'backdoor blocked' : 'backdoor open'}
        </text>
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 16px 16px', borderTop: '1px solid var(--line)', flexWrap: 'wrap' }}>
        <span className="mono" style={{ fontSize: 14 }}>
          <span className="muted">{doX ? 'intervene ' : 'observe '}</span>
          P(y <span style={{ color: doX ? 'var(--am)' : 'var(--cy)' }}>|</span>{' '}
          {doX ? <span className="am">do(x)</span> : 'x'})
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {[['observe', false], ['do(x)', true]].map(([l, v]) => (
            <button key={l} onClick={() => { setAuto(false); setDoX(v) }} className="mono"
              style={{
                fontSize: 11, padding: '5px 10px', background: doX === v ? (v ? 'var(--am)' : 'var(--cy)') : 'transparent',
                color: doX === v ? '#07080D' : 'var(--muted)', border: `1px solid ${doX === v ? 'transparent' : 'var(--line2)'}`,
              }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const cmd = useTyped('whoami', 300, 70)
  const tag = useTyped('I build AI that shows its work.', 1000, 38)
  const [burst, setBurst] = useState(false)
  const burstTimer = useRef(null)
  const triggerBurst = () => {
    if (burst) return
    setBurst(true)
    burstTimer.current = setTimeout(() => setBurst(false), 1000)
  }
  useEffect(() => () => clearTimeout(burstTimer.current), [])

  return (
    <section id="top" style={{ paddingTop: 56 }}>
      <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 48, justifyContent: 'space-between' }}>
        {/* Left */}
        <div style={{ flex: '1 1 460px', minWidth: 0 }}>
          <p className="mono" style={{ fontSize: 14, color: 'var(--soft)', margin: '0 0 18px' }}>
            <span className="cy">❯</span> ~ {cmd}{cmd.length < 6 && <span className="caret" />}
          </p>

          <h1 style={{ margin: 0 }}>
            <span className={`pixel glitch${burst ? ' burst' : ''}`} data-text="KAI" aria-label="KAI" onMouseEnter={triggerBurst} style={{
              display: 'block', fontSize: 'clamp(88px, 15vw, 150px)', lineHeight: 0.9, color: 'var(--vi)',
              textShadow: '5px 5px 0 rgba(0,229,255,.55), 10px 10px 0 rgba(255,176,32,.25)', letterSpacing: '0.02em',
            }}>KAI</span>
            <span style={{ display: 'block', fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.01em', marginTop: 22, color: 'var(--ink)' }}>
              Archit Sharma <span className="faint">·</span> <span className="soft" style={{ fontWeight: 500 }}>AI/ML Engineer</span>
            </span>
          </h1>

          <p className="mono" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'var(--am)', margin: '14px 0 22px', minHeight: '1.5em' }}>
            {tag}{tag.length > 0 && <span className="caret" style={{ background: 'var(--am)' }} />}
          </p>

          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--soft)', maxWidth: 540, margin: '0 0 26px' }}>
            MSc AI &amp; ML at <span style={{ color: 'var(--ink)' }}>TU Darmstadt</span>. I work on causal inference,
            probabilistic graphical models and grounded generative AI: systems where every claim can be traced
            back to the evidence that produced it. Right now that means hunting{' '}
            <span style={{ color: 'var(--ink)' }}>visual hallucinations in multimodal reasoning</span> in the
            TU Darmstadt Multimodal AI Project Lab.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 30 }}>
            <a href="#now" className="chip" style={{ '--cc': 'var(--cy)', textDecoration: 'none' }}>MAI Project Lab · 2026/27</a>
            <span className="chip" style={{ '--cc': 'var(--am)' }}>open to Werkstudent roles</span>
            <span className="chip" style={{ '--cc': 'var(--vi)' }}>Darmstadt, DE</span>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="#work" className="btn primary"><ArrowDown size={14} /> see the work</a>
            <a href="/Archit_Sharma_CV.pdf" className="btn" style={{ '--bc': 'var(--am)' }}><FileText size={14} /> CV</a>
            {primaryLinks.map(({ icon: Icon, label, href, c }) => (
              <a key={label} href={href} className="btn" style={{ '--bc': c }}
                target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={label}>
                <Icon size={14} /> {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: interactive do(x) */}
        <div style={{ flex: '0 1 440px', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <DoPanel />
        </div>
      </div>

      {/* Stats strip */}
      <div className="wrap" style={{ marginTop: 64 }}>
        <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {STATS.map((s, i) => (
            <div key={s.big} style={{ padding: '22px 26px', borderLeft: i ? '1px solid var(--line)' : 'none', display: 'flex', alignItems: 'baseline', gap: 14 }}>
              <span className="pixel" style={{ fontSize: 34, color: s.c, textShadow: `0 0 18px ${s.c}` }}>{s.big}</span>
              <span className="mono" style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>{s.small}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
