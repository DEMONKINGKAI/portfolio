import { useState, useEffect, useRef } from 'react'

const PROJECTS = [
  { id: 'causeway',   label: 'Causeway',   x: 120, y: 155, r: 52 },
  { id: 'threadfall', label: 'Threadfall', x: 385, y: 155, r: 60 },
  { id: 'neumf',      label: 'NeuMF',      x: 655, y: 155, r: 52 },
]

const SKILLS = [
  { id: 'dowhy',      label: 'DoWhy',            x: -18, y: 72,  projects: ['causeway'],              speed: 1.1,  phase: 0,   amp: 5 },
  { id: 'scipy',      label: 'SciPy',             x: -20, y: 155, projects: ['causeway'],              speed: 0.95, phase: 0.6, amp: 4 },
  { id: 'networkx',   label: 'networkx',          x: -18, y: 238, projects: ['causeway'],              speed: 0.85, phase: 2.2, amp: 6 },
  { id: 'matplotlib', label: ['matplot','lib'],   x: 75,  y: 18,  projects: ['causeway'],              speed: 1.0,  phase: 1.3, amp: 4 },
  { id: 'python',     label: 'Python',            x: 245, y: 42,  projects: ['causeway','threadfall'], speed: 1.0,  phase: 4.4, amp: 5 },
  { id: 'pgmpy',      label: 'pgmpy',             x: 245, y: 268, projects: ['causeway','threadfall'], speed: 1.2,  phase: 1.1, amp: 7 },
  { id: 'tailwind',   label: 'Tailwind',          x: 385, y: 12,  projects: ['threadfall'],            speed: 0.85, phase: 4.0, amp: 5 },
  { id: 'huggingface',label: ['Hugging','Face'],  x: 385, y: 298, projects: ['threadfall'],            speed: 1.05, phase: 5.5, amp: 5 },
  { id: 'fastapi',    label: 'FastAPI',           x: 520, y: 50,  projects: ['threadfall','neumf'],    speed: 0.95, phase: 3.3, amp: 6 },
  { id: 'react',      label: 'React',             x: 520, y: 260, projects: ['threadfall','neumf'],    speed: 1.15, phase: 2.7, amp: 6 },
  { id: 'pandas',     label: 'Pandas',            x: 655, y: 15,  projects: ['neumf'],                 speed: 0.88, phase: 5.1, amp: 4 },
  { id: 'pytorch',    label: 'PyTorch',           x: 798, y: 78,  projects: ['neumf'],                 speed: 0.9,  phase: 1.8, amp: 5 },
  { id: 'senttransf', label: ['sent.','transf.'], x: 816, y: 155, projects: ['neumf'],                 speed: 1.1,  phase: 3.9, amp: 5 },
  { id: 'numpy',      label: 'NumPy',             x: 798, y: 232, projects: ['neumf'],                 speed: 1.0,  phase: 2.5, amp: 4 },
]

const CAT = {
  python: { fill: 'rgba(77,61,247,0.06)',  stroke: 'rgba(77,61,247,0.28)',  text: '#7B72E8' },
  web:    { fill: 'rgba(217,119,6,0.06)',  stroke: 'rgba(217,119,6,0.32)',  text: '#B45309' },
  ai:     { fill: 'rgba(13,148,136,0.06)', stroke: 'rgba(13,148,136,0.32)', text: '#0F766E' },
}
const SKILL_CAT = {
  dowhy: 'python', scipy: 'python', networkx: 'python', matplotlib: 'python',
  python: 'python', pgmpy: 'python', numpy: 'python', pandas: 'python', pytorch: 'python',
  fastapi: 'web', react: 'web', tailwind: 'web',
  huggingface: 'ai', senttransf: 'ai',
}

const SPRING    = 'cubic-bezier(0.22,1.4,0.36,1)'
const NO_MOTION = typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
    const tick = (ts) => {
      if (!t0Ref.current) t0Ref.current = ts
      const t = (ts - t0Ref.current) / 1000
      const next = {}
      SKILLS.forEach(s => {
        next[s.id] = {
          x: s.x + Math.sin(t * s.speed + s.phase) * s.amp,
          y: s.y + Math.cos(t * s.speed * 0.7 + s.phase) * s.amp,
        }
      })
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
    ? `used in ${tooltipSkill.projects.map(pid => PROJECTS.find(p => p.id === pid).label).join(' · ')}`
    : ''
  const tooltipW = Math.max(tooltipText.length * 5.4 + 20, 60)

  return (
    <svg
      viewBox="0 0 830 310"
      width="100%"
      height="100%"
      aria-label="Skill graph: hover a project to see which skills power it"
      role="img"
      overflow="visible"
      style={{ display: 'block' }}
    >
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0.5 L0,5.5 L5,3 Z" fill="#C4C8D4" />
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
              d={edgePath(pos.x, pos.y, 32, p.x, p.y, p.r)}
              fill="none"
              stroke={on ? 'var(--accent)' : '#CDD0DA'}
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
                r={32}
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
                  y={(li - (lines.length - 1) / 2) * 13}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
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
        const isHov = hovered === p.id
        const dim   = !!hovered && !isHov
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
            aria-label={`${p.label} — hover to highlight skills used`}
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
                stroke={isHov ? 'var(--accent)' : '#8A909E'}
                strokeWidth={isHov ? 2 : 1.5}
                style={{ transition: 'stroke 0.2s' }}
              />
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: p.id === 'threadfall' ? 15 : 13,
                  fontWeight: 500,
                  fill: '#5A6170',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {p.label}
              </text>
            </g>
          </g>
        )
      })}

      {/* Skill tooltip — rendered on top */}
      {tooltipSkill && (() => {
        const pos = positions[tooltipSkill.id]
        return (
          <g transform={`translate(${pos.x},${pos.y - 46})`} style={{ pointerEvents: 'none' }}>
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
