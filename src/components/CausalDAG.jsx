import { useState, useEffect, useRef } from 'react'

const PROJECTS = [
  { id: 'causeway',    label: 'Causeway',        x: 148, y: 135, r: 68 },
  { id: 'threadfall',  label: 'Threadfall',       x: 500, y: 85,  r: 68 },
  { id: 'neumf',       label: 'NeuMF',            x: 852, y: 135, r: 68 },
  { id: 'loanDataset', label: ['Loan','Dataset'], x: 280, y: 358, r: 68 },
  { id: 'loanModel',   label: ['Loan','Model'],   x: 720, y: 358, r: 68 },
]

const SKILLS = [
  // Causeway-only — LEFT side
  { id: 'dowhy',       label: 'DoWhy',           x: -40,  y: 48,  projects: ['causeway'],                    speed: 1.1,  phase: 0,   amp: 5 },
  { id: 'scipy',       label: 'SciPy',            x: -42,  y: 135, projects: ['causeway'],                    speed: 0.95, phase: 0.6, amp: 4 },
  { id: 'networkx',    label: 'networkx',         x: -40,  y: 222, projects: ['causeway'],                    speed: 0.85, phase: 2.2, amp: 6 },
  { id: 'matplotlib',  label: ['matplot','lib'],  x: 58,   y: 5,   projects: ['causeway'],                    speed: 1.0,  phase: 1.3, amp: 4 },
  // Shared Causeway + Threadfall — upper band, well above center
  { id: 'python',      label: 'Python',           x: 318,  y: 5,   projects: ['causeway','threadfall'],       speed: 1.0,  phase: 4.4, amp: 5 },
  { id: 'pgmpy',       label: 'pgmpy',            x: 318,  y: 235, projects: ['causeway','threadfall'],       speed: 1.2,  phase: 1.1, amp: 7 },
  // Threadfall-only — directly above and below
  { id: 'tailwind',    label: 'Tailwind',         x: 500,  y: -62, projects: ['threadfall'],                  speed: 0.85, phase: 4.0, amp: 5 },
  { id: 'huggingface', label: ['Hugging','Face'], x: 500,  y: 252, projects: ['threadfall'],                  speed: 1.05, phase: 5.5, amp: 5 },
  // Shared Threadfall + NeuMF — upper band, well above center
  { id: 'fastapi',     label: 'FastAPI',          x: 678,  y: 5,   projects: ['threadfall','neumf'],          speed: 0.95, phase: 3.3, amp: 6 },
  { id: 'react',       label: 'React',            x: 678,  y: 252, projects: ['threadfall','neumf'],          speed: 1.15, phase: 2.7, amp: 6 },
  // NeuMF-only — RIGHT side
  { id: 'pandas',      label: 'Pandas',           x: 852,  y: 2,   projects: ['neumf'],                      speed: 0.88, phase: 5.1, amp: 4 },
  { id: 'pytorch',     label: 'PyTorch',          x: 992,  y: 68,  projects: ['neumf'],                      speed: 0.9,  phase: 1.8, amp: 5 },
  { id: 'senttransf',  label: ['sent.','transf.'],x: 1012, y: 138, projects: ['neumf'],                      speed: 1.1,  phase: 3.9, amp: 5 },
  { id: 'numpy',       label: 'NumPy',            x: 992,  y: 215, projects: ['neumf'],                      speed: 1.0,  phase: 2.5, amp: 4 },
  // LoanDataset-only — LEFT and BELOW only
  { id: 'ld_numpy',    label: 'NumPy',            x: 50,   y: 328, projects: ['loanDataset'],                 speed: 0.9,  phase: 0.8, amp: 4 },
  { id: 'kaggle',      label: 'Kaggle',           x: 52,   y: 452, projects: ['loanDataset'],                 speed: 1.0,  phase: 3.0, amp: 4 },
  { id: 'ld_bal',      label: ['class','balance'],x: 192,  y: 494, projects: ['loanDataset'],                 speed: 0.85, phase: 4.2, amp: 4 },
  { id: 'ld_pandas',   label: 'Pandas',           x: 285,  y: 514, projects: ['loanDataset'],                 speed: 1.05, phase: 2.6, amp: 5 },
  // Shared LoanDataset + LoanModel — centered below both
  { id: 'sklearn',     label: 'sklearn',          x: 500,  y: 502, projects: ['loanDataset','loanModel'],     speed: 0.9,  phase: 1.5, amp: 5 },
  // LoanModel-only — RIGHT and BELOW only (zero upper-zone encroachment)
  { id: 'lm_logit',   label: ['Logistic','Reg'],  x: 626,  y: 494, projects: ['loanModel'],                   speed: 1.08, phase: 3.8, amp: 4 },
  { id: 'lm_svm',     label: 'SVM',               x: 810,  y: 490, projects: ['loanModel'],                   speed: 0.88, phase: 5.2, amp: 5 },
  { id: 'xgboost',    label: 'XGBoost',           x: 942,  y: 464, projects: ['loanModel'],                   speed: 0.95, phase: 2.0, amp: 5 },
  { id: 'lm_rf',      label: ['Random','Forest'], x: 958,  y: 368, projects: ['loanModel'],                   speed: 0.92, phase: 1.2, amp: 5 },
  { id: 'seaborn',    label: 'Seaborn',           x: 942,  y: 278, projects: ['loanModel'],                   speed: 1.1,  phase: 4.5, amp: 4 },
]

const CAT = {
  python: { fill: 'var(--cat-py-fill)',   stroke: 'var(--cat-py-stroke)',   text: 'var(--cat-py-text)'   },
  web:    { fill: 'var(--cat-web-fill)',  stroke: 'var(--cat-web-stroke)',  text: 'var(--cat-web-text)'  },
  ai:     { fill: 'var(--cat-ai-fill)',   stroke: 'var(--cat-ai-stroke)',   text: 'var(--cat-ai-text)'   },
  data:   { fill: 'var(--cat-data-fill)', stroke: 'var(--cat-data-stroke)', text: 'var(--cat-data-text)' },
}
const SKILL_CAT = {
  // purple — causal inference & scientific Python
  dowhy: 'python', scipy: 'python', networkx: 'python', matplotlib: 'python',
  python: 'python', pgmpy: 'python',
  // yellow — engineering & platform tooling
  fastapi: 'web', react: 'web', tailwind: 'web',
  kaggle: 'web', sklearn: 'web', seaborn: 'web',
  // teal — neural / AI models & algorithms
  huggingface: 'ai', senttransf: 'ai', pytorch: 'ai',
  lm_rf: 'ai', lm_logit: 'ai', lm_svm: 'ai',
  // green — data wrangling & boosted models
  pandas: 'data', numpy: 'data',
  ld_numpy: 'data', ld_pandas: 'data', ld_bal: 'data', xgboost: 'data',
}

const SPRING    = 'cubic-bezier(0.22,1.4,0.36,1)'
const NO_MOTION = typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function projLabel(p) {
  return Array.isArray(p.label) ? p.label.join(' ') : p.label
}

function edgePath(sx, sy, sr, px, py, pr) {
  const dx = px - sx, dy = py - sy
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len === 0) return ''
  const ux = dx / len, uy = dy / len
  return `M${sx + ux * (sr + 4)},${sy + uy * (sr + 4)} L${px - ux * (pr + 7)},${py - uy * (pr + 7)}`
}

export default function CausalDAG() {
  const [hovered, setHovered]           = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [positions, setPositions]       = useState(() => {
    const p = {}
    SKILLS.forEach(s => { p[s.id] = { x: s.x, y: s.y } })
    return p
  })
  const rafRef = useRef(null)
  const t0Ref  = useRef(null)

  useEffect(() => {
    if (NO_MOTION) return

    // Mutable positions that persist across frames (lives in closure)
    const cur = {}
    SKILLS.forEach(s => { cur[s.id] = { x: s.x, y: s.y } })

    const SKILL_R  = 38
    const MIN_DIST = SKILL_R * 2 + 4   // 80 px — solid boundary
    const LERP     = 0.06              // how fast to chase the floating target

    const tick = (ts) => {
      if (!t0Ref.current) t0Ref.current = ts
      const t = (ts - t0Ref.current) / 1000

      // 1. Lerp each node toward its sinusoidal home position
      SKILLS.forEach(s => {
        const tx = s.x + Math.sin(t * s.speed + s.phase) * s.amp
        const ty = s.y + Math.cos(t * s.speed * 0.7 + s.phase) * s.amp
        cur[s.id].x += (tx - cur[s.id].x) * LERP
        cur[s.id].y += (ty - cur[s.id].y) * LERP
      })

      // 2. Iterative collision resolution — nodes push each other like solid balls
      for (let iter = 0; iter < 5; iter++) {
        for (let i = 0; i < SKILLS.length; i++) {
          for (let j = i + 1; j < SKILLS.length; j++) {
            const a = SKILLS[i], b = SKILLS[j]
            const pa = cur[a.id], pb = cur[b.id]
            const dx = pb.x - pa.x, dy = pb.y - pa.y
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.001
            if (dist < MIN_DIST) {
              const push = (MIN_DIST - dist) * 0.5
              const nx = dx / dist, ny = dy / dist
              pa.x -= nx * push
              pa.y -= ny * push
              pb.x += nx * push
              pb.y += ny * push
            }
          }
        }
      }

      // 3. Flush to React state for rendering
      const next = {}
      SKILLS.forEach(s => { next[s.id] = { x: cur[s.id].x, y: cur[s.id].y } })
      setPositions(next)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const activeSkills = hovered
    ? new Set(SKILLS.filter(s => s.projects.includes(hovered)).map(s => s.id))
    : new Set()

  const tooltipSkill = hoveredSkill ? SKILLS.find(s => s.id === hoveredSkill) : null
  const tooltipText  = tooltipSkill
    ? `used in ${tooltipSkill.projects.map(pid => projLabel(PROJECTS.find(p => p.id === pid))).join(' · ')}`
    : ''
  const tooltipW = Math.max(tooltipText.length * 5.4 + 20, 60)

  return (
    <svg
      viewBox="0 0 1060 560"
      width="100%"
      height="100%"
      aria-label="Skill graph: hover a project to see which skills power it"
      role="img"
      overflow="visible"
      style={{ display: 'block' }}
    >
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0.5 L0,5.5 L5,3 Z" fill="var(--faint)" />
        </marker>
        <marker id="arr-on" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0.5 L0,5.5 L5,3 Z" fill="var(--accent)" />
        </marker>
        <filter id="proj-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>

      {/* Ambient glow behind hovered project */}
      {hovered && (() => {
        const p = PROJECTS.find(proj => proj.id === hovered)
        return (
          <circle
            cx={p.x} cy={p.y} r={p.r + 40}
            fill="var(--accent)"
            opacity={0.09}
            filter="url(#proj-glow)"
            style={{ pointerEvents: 'none' }}
          />
        )
      })()}

      {/* Edges */}
      {SKILLS.flatMap(s =>
        s.projects.map(pid => {
          const p      = PROJECTS.find(p => p.id === pid)
          const pos    = positions[s.id]
          const on     = hovered === pid
          const shared = s.projects.length > 1
          return (
            <path
              key={`${s.id}-${pid}`}
              d={edgePath(pos.x, pos.y, 38, p.x, p.y, p.r)}
              fill="none"
              stroke={on ? 'var(--accent)' : 'var(--faint)'}
              strokeWidth={on ? 1.8 : 1}
              strokeDasharray={on ? 'none' : shared ? '5 3' : 'none'}
              markerEnd={on ? 'url(#arr-on)' : 'url(#arr)'}
              opacity={hovered && !on ? 0.2 : 1}
              style={{ transition: 'stroke 0.2s, opacity 0.2s' }}
            />
          )
        })
      )}

      {/* Skill nodes */}
      {SKILLS.map((s, i) => {
        const on    = activeSkills.has(s.id)
        const dim   = !!hovered && !on
        const pos   = positions[s.id]
        const lines = Array.isArray(s.label) ? s.label : [s.label]
        const cat   = CAT[SKILL_CAT[s.id]] ?? CAT.python

        return (
          <g
            key={s.id}
            transform={`translate(${pos.x},${pos.y})`}
            onMouseEnter={() => setHoveredSkill(s.id)}
            onMouseLeave={() => setHoveredSkill(null)}
            style={{
              opacity: dim ? 0.18 : 1,
              transition: 'opacity 0.2s',
              animation: `fadeIn 0.35s ease both ${i * 0.06 + 0.1}s`,
            }}
          >
            <g style={{
              transform: on ? 'scale(1.14)' : 'scale(1)',
              transformOrigin: '0px 0px',
              transition: `transform ${NO_MOTION ? '0.1s ease' : `0.18s ${SPRING}`}`,
            }}>
              <circle
                r={38}
                fill={on ? 'var(--accent-soft)' : cat.fill}
                stroke={on ? 'var(--accent)' : cat.stroke}
                strokeWidth={on ? 1.5 : 1}
                style={{ transition: 'fill 0.2s, stroke 0.2s' }}
              />
              {lines.map((line, li) => (
                <text
                  key={li}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  y={(li - (lines.length - 1) / 2) * 14}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: on ? 500 : 400,
                    fill: on ? 'var(--accent)' : cat.text,
                    transition: 'fill 0.2s',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {line}
                </text>
              ))}
            </g>
          </g>
        )
      })}

      {/* Project nodes */}
      {PROJECTS.map((p, i) => {
        const isHov  = hovered === p.id
        const dim    = !!hovered && !isHov
        const labels = Array.isArray(p.label) ? p.label : [p.label]
        const fsize  = Array.isArray(p.label) ? 15 : 18

        return (
          <g
            key={p.id}
            transform={`translate(${p.x},${p.y})`}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(p.id)}
            onBlur={() => setHovered(null)}
            tabIndex={0}
            role="button"
            aria-label={`${projLabel(p)} — hover to highlight skills used`}
            style={{
              cursor: 'pointer',
              outline: 'none',
              opacity: dim ? 0.32 : 1,
              transition: 'opacity 0.2s',
              animation: `fadeIn 0.4s ease both ${i * 0.15}s`,
            }}
          >
            <g style={{
              transform: isHov ? 'scale(1.22)' : 'scale(1)',
              transformOrigin: '0px 0px',
              transition: `transform ${NO_MOTION ? '0.1s ease' : `0.18s ${SPRING}`}`,
            }}>
              <circle r={p.r + 6} fill="none" stroke="rgba(90,97,112,0.08)" strokeWidth={8} />
              <circle
                r={p.r}
                fill="var(--surface)"
                stroke={isHov ? 'var(--accent)' : 'var(--muted)'}
                strokeWidth={isHov ? 2 : 1.5}
                style={{ transition: 'stroke 0.2s' }}
              />
              {labels.map((line, li) => (
                <text
                  key={li}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  y={(li - (labels.length - 1) / 2) * 17}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: fsize,
                    fontWeight: 500,
                    fill: 'var(--muted)',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {line}
                </text>
              ))}
            </g>
          </g>
        )
      })}

      {/* Skill tooltip — rendered on top */}
      {tooltipSkill && (() => {
        const pos = positions[tooltipSkill.id]
        return (
          <g transform={`translate(${pos.x},${pos.y - 52})`} style={{ pointerEvents: 'none' }}>
            <rect
              x={-tooltipW / 2} y={-12}
              width={tooltipW} height={22} rx={4}
              fill="var(--surface)" stroke="var(--line)" strokeWidth={1}
            />
            <text
              textAnchor="middle" dominantBaseline="middle"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: 'var(--muted)' }}
            >
              {tooltipText}
            </text>
          </g>
        )
      })()}
    </svg>
  )
}
