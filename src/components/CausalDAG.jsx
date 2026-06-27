import { useEffect, useRef, useState } from 'react'

// Node positions hand-placed for a clean left-to-right DAG layout
// Coordinate space: 560 x 340 (viewBox)
const NODES = [
  { id: 'causal',      label: 'Causal Inference',     x: 60,  y: 80  },
  { id: 'nlp',         label: 'NLP',                  x: 60,  y: 175 },
  { id: 'mlops',       label: 'MLOps',                x: 60,  y: 270 },
  { id: 'pgm',         label: 'Graphical Models',     x: 220, y: 80  },
  { id: 'genai',       label: 'Generative AI',        x: 220, y: 175 },
  { id: 'causeway',    label: 'Causeway',             x: 220, y: 270 },
  { id: 'threadfall',  label: 'Threadfall',           x: 420, y: 175 },
]

const EDGES = [
  { from: 'causal',  to: 'pgm'       },
  { from: 'causal',  to: 'causeway'  },
  { from: 'nlp',     to: 'genai'     },
  { from: 'mlops',   to: 'threadfall'},
  { from: 'pgm',     to: 'threadfall'},
  { from: 'genai',   to: 'threadfall'},
  { from: 'causeway','to': 'threadfall'},
]

function getDescendants(nodeId) {
  const visited = new Set()
  const queue = [nodeId]
  while (queue.length) {
    const curr = queue.shift()
    if (visited.has(curr)) continue
    visited.add(curr)
    EDGES.forEach(e => { if (e.from === curr && !visited.has(e.to)) queue.push(e.to) })
  }
  return visited
}

function getActiveEdges(nodeId) {
  const desc = getDescendants(nodeId)
  return new Set(EDGES.filter(e => desc.has(e.from) && desc.has(e.to)).map(e => `${e.from}-${e.to}`))
}

// Build arrowhead path from edge, offset so arrow tip lands on node circumference
function edgePath(from, to, nodes) {
  const f = nodes.find(n => n.id === from)
  const t = nodes.find(n => n.id === to)
  const r = 28
  const dx = t.x - f.x
  const dy = t.y - f.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len
  const uy = dy / len
  // Start from edge of source node, end just before edge of target node (arrowhead fits)
  const x1 = f.x + ux * r
  const y1 = f.y + uy * r
  const x2 = t.x - ux * (r + 8)
  const y2 = t.y - uy * (r + 8)
  return `M${x1},${y1} L${x2},${y2}`
}

const REDUCED_MOTION = typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CausalDAG({ mobile }) {
  const [hovered, setHovered] = useState(null)
  const [animated, setAnimated] = useState(REDUCED_MOTION)
  const edgeRefs = useRef({})

  const activeNodes = hovered ? getDescendants(hovered) : new Set()
  const activeEdges = hovered ? getActiveEdges(hovered) : new Set()

  // Stroke-dashoffset draw-in animation
  useEffect(() => {
    if (REDUCED_MOTION) return
    const timeout = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  const vw = mobile ? 300 : 560
  const vh = mobile ? 200 : 340

  // Scale down for mobile
  const scale = mobile ? 300 / 560 : 1

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      width="100%"
      height="100%"
      aria-label="Interactive causal graph showing how skills and projects connect, converging on Threadfall"
      role="img"
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        <marker
          id="arrow-default"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L6,3 Z" fill="var(--line)" />
        </marker>
        <marker
          id="arrow-active"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L6,3 Z" fill="var(--accent)" />
        </marker>
      </defs>

      <g transform={mobile ? `scale(${scale})` : undefined}>
        {/* Edges */}
        {EDGES.map(e => {
          const id = `${e.from}-${e.to}`
          const isActive = activeEdges.has(id)
          const d = edgePath(e.from, e.to, NODES)

          // For animation, measure path length
          return (
            <path
              key={id}
              ref={el => { edgeRefs.current[id] = el }}
              d={d}
              fill="none"
              stroke={isActive ? 'var(--accent)' : 'var(--line)'}
              strokeWidth={isActive ? 1.5 : 1}
              markerEnd={isActive ? 'url(#arrow-active)' : 'url(#arrow-default)'}
              style={{
                transition: 'stroke 0.2s, stroke-width 0.2s',
                strokeDasharray: animated ? 'none' : '200',
                strokeDashoffset: animated ? '0' : '200',
                animation: animated || REDUCED_MOTION ? 'none' : `drawEdge 0.6s ease forwards`,
                animationDelay: animated ? '0s' : `${EDGES.indexOf(e) * 0.08}s`,
              }}
            />
          )
        })}

        {/* Nodes */}
        {NODES.map((n, i) => {
          const isActive = activeNodes.has(n.id)
          const isHovered = hovered === n.id
          const isSink = n.id === 'threadfall'

          return (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y})`}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(n.id)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              role="button"
              aria-label={`${n.label} — hover to see downstream connections`}
              style={{
                cursor: 'pointer',
                outline: 'none',
                opacity: animated ? 1 : 0,
                animation: REDUCED_MOTION ? 'none' : `fadeNode 0.4s ease forwards`,
                animationDelay: REDUCED_MOTION ? '0s' : `${i * 0.07 + 0.3}s`,
              }}
            >
              {/* Node circle */}
              <circle
                r={isSink ? 34 : 28}
                fill={
                  isActive ? 'var(--accent-soft)' :
                  isHovered ? 'var(--accent-soft)' :
                  'var(--surface)'
                }
                stroke={
                  isActive || isHovered ? 'var(--accent)' : 'var(--line)'
                }
                strokeWidth={isActive || isHovered ? 1.5 : 1}
                style={{ transition: 'fill 0.2s, stroke 0.2s, stroke-width 0.2s' }}
              />

              {/* Label — wrap at ~12 chars */}
              {n.label.split(' ').reduce((lines, word) => {
                const last = lines[lines.length - 1]
                if (last && (last + ' ' + word).length <= 11) {
                  lines[lines.length - 1] = last + ' ' + word
                } else {
                  lines.push(word)
                }
                return lines
              }, []).map((line, li, arr) => (
                <text
                  key={li}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  y={(li - (arr.length - 1) / 2) * 13}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: isSink ? 9 : 8,
                    fontWeight: isSink ? 500 : 400,
                    fill: isActive || isHovered ? 'var(--accent)' : 'var(--muted)',
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
      </g>

      <style>{`
        @keyframes drawEdge {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeNode {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </svg>
  )
}
