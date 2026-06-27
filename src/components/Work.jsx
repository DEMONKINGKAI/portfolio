import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './Icons'
import SectionEyebrow from './SectionEyebrow'

const PROJECTS = [
  {
    name: 'Threadfall: The Shattered Pact',
    tagline: 'Every choice pulls a thread.',
    featured: true,
    problem: `LLMs lose track of world state in long-running interactive systems — they contradict themselves, drift, and hallucinate continuity. Most "AI games" hand both decision-making and narration to the model, leaving state unreliable.`,
    approach: `A clean architectural boundary: a deterministic causal engine (pgmpy-based probabilistic DAG) owns all world state and consequences. The LLM is restricted strictly to narration and never makes a decision. Every player choice propagates through the causal graph — the world stays consistent across arbitrarily long sessions.`,
    stack: ['Python', 'FastAPI', 'pgmpy', 'React', 'Tailwind', 'HuggingFace'],
    github: 'YOUR_THREADFALL_GITHUB_URL',
    demo: 'YOUR_THREADFALL_DEMO_URL',
  },
  {
    name: 'Causeway',
    tagline: 'Causal graph visualization and inference toolkit.',
    featured: false,
    problem: `Working hands-on with causal graphs requires tooling that lets you build, inspect, and run inference in the same environment — a gap between theory and practical experimentation.`,
    approach: `A self-contained toolkit for constructing causal DAGs, running do-calculus queries, visualizing Markov equivalence classes, and computing backdoor/frontdoor adjustments. Threadfall's causal backend grew out of this project.`,
    stack: ['Python', 'pgmpy', 'DoWhy', 'networkx'],
    github: 'YOUR_CAUSEWAY_GITHUB_URL',
    demo: null,
  },
]

function Chip({ label }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        padding: '3px 8px',
        borderRadius: 4,
        background: 'var(--bg)',
        border: '1px solid var(--line)',
        color: 'var(--muted)',
        display: 'inline-block',
      }}
    >
      {label}
    </span>
  )
}

function ProjectCard({ p }) {
  const cardStyle = {
    background: 'var(--surface)',
    border: `1px solid ${p.featured ? 'var(--accent)' : 'var(--line)'}`,
    borderRadius: 8,
    padding: p.featured ? 36 : 28,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    position: 'relative',
    boxShadow: p.featured ? '0 0 0 1px rgba(77,61,247,0.08), 0 4px 24px rgba(77,61,247,0.06)' : 'none',
  }

  return (
    <article style={cardStyle}>
      {p.featured && (
        <span
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: 'var(--accent)',
            background: 'var(--accent-soft)',
            padding: '2px 8px',
            borderRadius: 3,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          flagship
        </span>
      )}

      <div>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: p.featured ? 22 : 18,
            color: 'var(--ink)',
            margin: '0 0 6px',
            letterSpacing: '-0.01em',
          }}
        >
          {p.name}
        </h3>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: 'var(--accent)',
            margin: 0,
          }}
        >
          {p.tagline}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: 'var(--faint)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            the problem
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              lineHeight: 1.65,
              color: 'var(--muted)',
              margin: 0,
            }}
          >
            {p.problem}
          </p>
        </div>
        <div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: 'var(--faint)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            the approach
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              lineHeight: 1.65,
              color: 'var(--muted)',
              margin: 0,
            }}
          >
            {p.approach}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {p.stack.map(s => <Chip key={s} label={s} />)}
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--muted)',
            textDecoration: 'none',
            padding: '6px 12px',
            border: '1px solid var(--line)',
            borderRadius: 5,
            background: 'transparent',
            transition: 'color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--line)' }}
        >
          <GithubIcon size={12} /> repo
        </a>
        {p.demo && (
          <a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: 'var(--muted)',
              textDecoration: 'none',
              padding: '6px 12px',
              border: '1px solid var(--line)',
              borderRadius: 5,
              background: 'transparent',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--line)' }}
          >
            <ExternalLink size={12} /> demo
          </a>
        )}
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <section
      id="work"
      style={{
        borderTop: '1px solid var(--line)',
        padding: '80px 24px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <SectionEyebrow label="selected work" />
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 32,
          letterSpacing: '-0.02em',
          color: 'var(--ink)',
          margin: '0 0 40px',
        }}
      >
        Projects
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {PROJECTS.map(p => <ProjectCard key={p.name} p={p} />)}
      </div>
    </section>
  )
}
