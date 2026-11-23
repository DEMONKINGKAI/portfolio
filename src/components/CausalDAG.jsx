import { useState, useEffect, useRef } from 'react'

export const PROJECTS = [
  { id: 'overseer',      label: 'Overseer',             x: 290, y: -165, r: 68, isNew: true },
  { id: 'decisiongraph', label: ['Decision','Graph'],   x: 710, y: -165, r: 68, isNew: true },
  { id: 'causeway',      label: 'Causeway',            x: 148, y: 115, r: 68 },
  { id: 'threadfall',    label: 'Threadfall',           x: 500, y: 65,  r: 68 },
  { id: 'neumf',         label: 'NeuMF',                x: 852, y: 115, r: 68 },
  { id: 'pharmacausal',  label: ['Pharma','Causal'],    x: 148, y: 290, r: 68 },
  { id: 'evidentia',     label: 'Evidentia',            x: 500, y: 290, r: 68 },
  { id: 'fonsiuris',     label: ['Fons','Iuris'],       x: 852, y: 290, r: 68 },
]

export const SKILLS = [
  // Overseer
  { id: 'tauri',       label: 'Tauri',            x: 120,  y: -230, projects: ['overseer'],                   speed: 0.9,  phase: 0.4, amp: 5 },
  { id: 'rust',        label: 'Rust',             x: 140,  y: -120, projects: ['overseer'],                   speed: 1.05, phase: 2.4, amp: 5 },
  { id: 'nodejs',      label: 'Node.js',          x: 300,  y: -300, projects: ['overseer'],                   speed: 0.95, phase: 1.4, amp: 4 },
  // Shared Overseer + Decision Graph
  { id: 'cchooks',     label: ['Claude','hooks'], x: 500,  y: -210, projects: ['overseer','decisiongraph'],   speed: 1.0,  phase: 3.1, amp: 6 },
  // Decision Graph
  { id: 'haiku',       label: 'Haiku',            x: 700,  y: -300, projects: ['decisiongraph'],              speed: 1.1,  phase: 0.9, amp: 5 },
  { id: 'stdlib',      label: ['py','stdlib'],    x: 870,  y: -250, projects: ['decisiongraph'],              speed: 0.9,  phase: 4.2, amp: 5 },
  { id: 'plugin',      label: ['plugin','mktplc'],x: 890,  y: -130, projects: ['decisiongraph'],              speed: 1.0,  phase: 2.0, amp: 4 },
  // Causeway-only — LEFT side
  { id: 'dowhy',       label: 'DoWhy',           x: -48,  y: 48,  projects: ['causeway'],                    speed: 1.1,  phase: 0,   amp: 5 },
  { id: 'scipy',       label: 'SciPy',            x: -48,  y: 130, projects: ['causeway'],                    speed: 0.95, phase: 0.6, amp: 4 },
  { id: 'networkx',    label: 'networkx',         x: -48,  y: 215, projects: ['causeway'],                    speed: 0.85, phase: 2.2, amp: 6 },
  { id: 'matplotlib',  label: ['matplot','lib'],  x: 58,   y: 5,   projects: ['causeway'],                    speed: 1.0,  phase: 1.3, amp: 4 },
  // Shared Causeway + Threadfall
  { id: 'python',      label: 'Python',           x: 318,  y: 2,   projects: ['causeway','threadfall'],       speed: 1.0,  phase: 4.4, amp: 5 },
  { id: 'pgmpy',       label: 'pgmpy',            x: 318,  y: 228, projects: ['causeway','threadfall'],       speed: 1.2,  phase: 1.1, amp: 7 },
  // Threadfall-only
  { id: 'tailwind',    label: 'Tailwind',         x: 500,  y: -60, projects: ['threadfall'],                  speed: 0.85, phase: 4.0, amp: 5 },
  { id: 'huggingface', label: ['Hugging','Face'], x: 390,  y: 200, projects: ['threadfall'],                  speed: 1.05, phase: 5.5, amp: 5 },
  // Shared Threadfall + NeuMF
  { id: 'fastapi',     label: 'FastAPI',          x: 678,  y: 2,   projects: ['threadfall','neumf'],          speed: 0.95, phase: 3.3, amp: 6 },
  { id: 'react',       label: 'React',            x: 678,  y: 240, projects: ['threadfall','neumf'],          speed: 1.15, phase: 2.7, amp: 6 },
  // NeuMF-only — RIGHT side
  { id: 'pandas',      label: 'Pandas',           x: 852,  y: -22, projects: ['neumf'],                      speed: 0.88, phase: 5.1, amp: 4 },
  { id: 'pytorch',     label: 'PyTorch',          x: 978,  y: 48,  projects: ['neumf'],                      speed: 0.9,  phase: 1.8, amp: 5 },
  { id: 'senttransf',  label: ['sent.','transf.'],x: 998,  y: 128, projects: ['neumf'],                      speed: 1.1,  phase: 3.9, amp: 5 },
  { id: 'numpy',       label: 'NumPy',            x: 978,  y: 208, projects: ['neumf'],                      speed: 1.0,  phase: 2.5, amp: 4 },
  // pharmacausal-only — LEFT below causeway zone
  { id: 'fci',         label: 'FCI',              x: -48,  y: 302, projects: ['pharmacausal'],                speed: 0.92, phase: 1.5, amp: 5 },
  { id: 'faers',       label: 'FAERS',            x: -48,  y: 392, projects: ['pharmacausal'],                speed: 1.0,  phase: 3.2, amp: 4 },
  { id: 'sider',       label: 'SIDER',            x: 58,   y: 452, projects: ['pharmacausal'],                speed: 0.88, phase: 0.9, amp: 5 },
  // evidentia-only — CENTER below
  { id: 'ddxplus',     label: 'DDXPlus',          x: 385,  y: 405, projects: ['evidentia'],                   speed: 1.0,  phase: 2.8, amp: 4 },
  { id: 'bayes_net',   label: ['Bayes','Net'],    x: 500,  y: 455, projects: ['evidentia'],                   speed: 0.9,  phase: 4.6, amp: 5 },
  { id: 'brier',       label: 'Brier',            x: 615,  y: 405, projects: ['evidentia'],                   speed: 1.05, phase: 1.7, amp: 4 },
  // fons-iuris-only — RIGHT middle zone
  { id: 'rag',         label: 'RAG',              x: 968,  y: 292, projects: ['fonsiuris'],                   speed: 0.95, phase: 3.5, amp: 5 },
  { id: 'nli',         label: 'NLI',              x: 985,  y: 378, projects: ['fonsiuris'],                   speed: 1.08, phase: 5.0, amp: 4 },
  { id: 'chromadb',    label: 'ChromaDB',         x: 968,  y: 458, projects: ['fonsiuris'],                   speed: 0.88, phase: 2.1, amp: 5 },
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
  stdlib: 'python', cchooks: 'ai', haiku: 'ai', tauri: 'web', rust: 'web', nodejs: 'web', plugin: 'web',
  python: 'python', pgmpy: 'python', fci: 'python', bayes_net: 'python',
  // yellow — engineering & platform tooling
  fastapi: 'web', react: 'web', tailwind: 'web',
  chromadb: 'web',
  // orange — neural / AI models & algorithms
  huggingface: 'ai', senttransf: 'ai', pytorch: 'ai',
  rag: 'ai', nli: 'ai',
  // green — data wrangling & datasets
  pandas: 'data', numpy: 'data',
  
  faers: 'data', sider: 'data', ddxplus: 'data', brier: 'data',
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
  const svgRef = useRef(null)
  const [onScreen, setOnScreen] = useState(false)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (NO_MOTION || !onScreen) return

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
  }, [onScreen])

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
      ref={svgRef}
      viewBox="-60 -345 1180 860"
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
              <circle r={p.r + 6} fill="none" stroke={p.isNew ? 'rgba(255,59,92,0.10)' : 'rgba(0,229,255,0.05)'} strokeWidth={8} />
              <circle
                r={p.r}
                fill="var(--bg)"
                stroke={isHov ? 'var(--accent)' : p.isNew ? 'var(--vi)' : 'var(--line2)'}
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
                    fill: isHov ? 'var(--accent)' : 'var(--ink)',
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
