import { useState } from 'react'

// Projects are the two anchor nodes
const PROJECTS = [
  { id: 'causeway',   label: 'Causeway',   x: 148, y: 152, r: 38 },
  { id: 'threadfall', label: 'Threadfall', x: 398, y: 152, r: 44 },
]

// Skills orbit the projects they belong to
// `projects` lists which project nodes this skill connects to
const SKILLS = [
  { id: 'dowhy',       label: 'DoWhy',      x: 48,  y: 76,  projects: ['causeway'],                    delay: 0    },
  { id: 'networkx',    label: 'networkx',   x: 48,  y: 228, projects: ['causeway'],                    delay: 0.7  },
  { id: 'python',      label: 'Python',     x: 268, y: 52,  projects: ['causeway', 'threadfall'],      delay: 1.4  },
  { id: 'pgmpy',       label: 'pgmpy',      x: 268, y: 252, projects: ['causeway', 'threadfall'],      delay: 2.1  },
  { id: 'fastapi',     label: 'FastAPI',    x: 484, y: 70,  projects: ['threadfall'],                  delay: 0.35 },
  { id: 'huggingface', label: 'HuggingFace',x: 508, y: 152, projects: ['threadfall'],                  delay: 1.05 },
  { id: 'react',       label: 'React',      x: 484, y: 234, projects: ['threadfall'],                  delay: 1.75 },
  { id: 'tailwind',    label: 'Tailwind',   x: 396, y: 276, projects: ['threadfall'],                  delay: 2.45 },
]

// Build edge list: skill → project
const EDGES = SKILLS.flatMap(s =>
  s.projects.map(p => ({ from: s.id, to: p }))
)

function edgePath(skill, projectId) {
  const s = SKILLS.find(n => n.id === skill)
  const p = PROJECTS.find(n => n.id === projectId)
  const dx = p.x - s.x
  const dy = p.y - s.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len
  const uy = dy / len
  const x1 = s.x + ux * 24        // skill radius = 24
  const y1 = s.y + uy * 24
  const x2 = p.x - ux * (p.r + 7) // project radius + arrow gap
  const y2 = p.y - uy * (p.r + 7)
  return `M${x1},${y1} L${x2},${y2}`
}

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CausalDAG() {
  const [hovered, setHovered] = useState(null)

  // Skills lit up when their project is hovered
  const activeSkills = hovered
    ? new Set(SKILLS.filter(s => s.projects.includes(hovered)).map(s => s.id))
    : new Set()

  const activeEdges = hovered
    ? new Set(EDGES.filter(e => e.to === hovered).map(e => `${e.from}-${e.to}`))
    : new Set()

  return (
    <svg
      viewBox="0 0 556 310"
      width="100%"
      height="100%"
      aria-label="Skill graph: hover a project to see which skills power it"
      role="img"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <marker id="sk-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0.5 L0,5.5 L5,3 Z" fill="#C4C8D4" />
        </marker>
        <marker id="sk-arr-on" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0.5 L0,5.5 L5,3 Z" fill="var(--accent)" />
        </marker>
      </defs>

      <style>{`
        @keyframes skillFloat {
          0%, 100% { translate: 0 0px; }
          50%       { translate: 0 -6px; }
        }
        @keyframes skillFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes projectFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* ── Edges ── */}
      {EDGES.map(e => {
        const id = `${e.from}-${e.to}`
        const on = activeEdges.has(id)
        return (
          <path
            key={id}
            d={edgePath(e.from, e.to)}
            fill="none"
            stroke={on ? 'var(--accent)' : '#CDD0DA'}
            strokeWidth={on ? 1.6 : 1}
            markerEnd={on ? 'url(#sk-arr-on)' : 'url(#sk-arr)'}
            style={{ transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s' }}
            opacity={hovered && !on ? 0.3 : 1}
          />
        )
      })}

      {/* ── Skill nodes ── */}
      {SKILLS.map((s, i) => {
        const on  = activeSkills.has(s.id)
        const dim = !!hovered && !on
        const labelLines = s.label.includes('HuggingFace')
          ? ['Hugging', 'Face']
          : [s.label]

        return (
          <g
            key={s.id}
            transform={`translate(${s.x},${s.y})`}
            style={{
              animation: REDUCED_MOTION
                ? 'none'
                : `skillFloat 3s ease-in-out infinite ${s.delay}s, skillFadeIn 0.4s ease both ${i * 0.06 + 0.1}s`,
              transition: `scale ${REDUCED_MOTION ? '0.15s ease' : '0.45s cubic-bezier(0.34,1.56,0.64,1)'}, opacity 0.2s`,
              opacity: dim ? 0.25 : 1,
              scale: on ? '1.13' : '1',
              transformBox: 'fill-box',
              transformOrigin: 'center',
            }}
          >
            <circle
              r={24}
              fill={on ? 'var(--accent-soft)' : 'var(--surface)'}
              stroke={on ? 'var(--accent)' : '#CDD0DA'}
              strokeWidth={on ? 1.5 : 1}
              style={{ transition: 'fill 0.2s, stroke 0.2s' }}
            />
            {labelLines.map((line, li) => (
              <text
                key={li}
                textAnchor="middle"
                dominantBaseline="middle"
                y={(li - (labelLines.length - 1) / 2) * 11}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 7.5,
                  fontWeight: on ? 500 : 400,
                  fill: on ? 'var(--accent)' : '#9AA0AD',
                  transition: 'fill 0.2s',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {line}
              </text>
            ))}
          </g>
        )
      })}

      {/* ── Project nodes ── */}
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
              transition: `scale ${REDUCED_MOTION ? '0.15s ease' : '0.5s cubic-bezier(0.34,1.56,0.64,1)'}, opacity 0.2s`,
              opacity: dim ? 0.4 : 1,
              scale: isHov ? '1.12' : '1',
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: REDUCED_MOTION
                ? 'none'
                : `projectFadeIn 0.4s ease both ${i * 0.15 + 0.05}s`,
            }}
          >
            {/* Subtle glow ring when hovered */}
            {isHov && (
              <circle
                r={p.r + 10}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={1}
                opacity={0.18}
              />
            )}
            <circle
              r={p.r}
              fill={isHov ? 'var(--accent-soft)' : 'var(--surface)'}
              stroke={isHov ? 'var(--accent)' : '#8A909E'}
              strokeWidth={isHov ? 2 : 1.5}
              style={{ transition: 'fill 0.2s, stroke 0.2s, stroke-width 0.2s' }}
            />
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: p.id === 'threadfall' ? 11 : 10,
                fontWeight: 500,
                fill: isHov ? 'var(--accent)' : '#5A6170',
                transition: 'fill 0.2s',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {p.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
