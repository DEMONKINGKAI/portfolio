import { useEffect, useState } from 'react'
import { ExternalLink, Database } from 'lucide-react'
import { GithubIcon } from './Icons'
import Runner from './Runner'
import SectionTitle from './SectionEyebrow'

const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ── Featured: new Claude tooling ─────────────────────────────────────── */
const FEATURED = [
  {
    id: 'overseer',
    num: '01',
    kind: 'DEV TOOLING · CLAUDE CODE · TAURI',
    color: 'var(--am)',
    title: 'Overseer',
    tagline: 'Your agents have an Overseer now.',
    desc: `A tray widget that watches every local Claude Code session and flags the ones that need you. Running five agents in parallel means constantly tab-hopping to check who is stuck; Overseer sits in the system tray and shows each session's live state at a glance (working, your move, needs approval, gone quiet, ended), driven entirely by Claude Code hooks rather than screen-scraping.`,
    chips: ['5 live states', 'hook-driven', 'Windows + macOS'],
    stack: 'Tauri · Rust · Node.js · Claude Code hooks',
    github: 'https://github.com/DEMONKINGKAI/overseer',
  },
  {
    id: 'decisiongraph',
    num: '02',
    kind: 'CLAUDE CODE PLUGIN · AGENT MEMORY',
    color: 'var(--cy)',
    title: 'Decision Graph',
    tagline: 'Long sessions forget. The graph doesn\'t.',
    desc: `A Claude Code plugin that records the decisions made during long sessions as a graph Claude can query: why was this chosen, what depends on it, what has gone stale. When context gets compacted the reasoning survives, and the plugin warns when a new command contradicts an earlier decision. Installs from a public plugin marketplace.`,
    chips: ['100% recall', '99% precision', '10-case extraction eval'],
    stack: 'Python (stdlib) · Claude Code hooks · Haiku',
    github: 'https://github.com/DEMONKINGKAI/neuro-graph',
  },
]

/* Overseer mini-widget: sessions cycling through live states */
const STATES = [
  { l: 'working', c: 'var(--cy)' },
  { l: 'your move', c: 'var(--am)' },
  { l: 'needs approval', c: 'var(--vi)' },
  { l: 'gone quiet', c: 'var(--muted)' },
  { l: 'ended', c: 'var(--faint)' },
]
const SESSIONS = [['api-server', 0], ['thesis-eval', 2], ['portfolio', 1], ['neuro-graph', 0]]

function OverseerVis() {
  const [t, setT] = useState(0)
  useEffect(() => {
    if (REDUCED) return
    const iv = setInterval(() => setT(x => x + 1), 1700)
    return () => clearInterval(iv)
  }, [])
  const seq = [0, 0, 1, 2, 0, 3, 0, 4]
  return (
    <div className="mono" style={{ fontSize: 12.5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 12, borderBottom: '1px solid var(--line)', marginBottom: 8 }}>
        <span style={{ width: 12, height: 12, border: '2px solid var(--am)', display: 'inline-block' }} />
        <span style={{ color: 'var(--ink)' }}>overseer</span><span className="faint">· {SESSIONS.length} sessions</span>
      </div>
      {SESSIONS.map(([name, off], i) => {
        const st = STATES[seq[(t + off + i * 3) % seq.length]]
        const attention = st.l === 'needs approval' || st.l === 'your move'
        return (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 8px', background: attention ? `color-mix(in srgb, ${st.c} 8%, transparent)` : 'transparent', transition: 'background .3s' }}>
            <span style={{ width: 8, height: 8, background: st.c, boxShadow: attention ? `0 0 10px ${st.c}` : 'none', animation: st.l === 'working' ? 'statusPulse 1.2s infinite' : 'none' }} />
            <span style={{ color: 'var(--soft)', flex: 1 }}>{name}</span>
            <span style={{ color: st.c, fontSize: 11 }}>{st.l}</span>
          </div>
        )
      })}
    </div>
  )
}

/* Decision Graph mini-vis: D-1 → D-3/D-4, one decision goes stale */
function DecisionVis() {
  const [stale, setStale] = useState(false)
  useEffect(() => {
    if (REDUCED) return
    const iv = setInterval(() => setStale(s => !s), 2600)
    return () => clearInterval(iv)
  }, [])
  const box = (x, y, label, c, dim) => (
    <g style={{ transition: 'opacity .4s', opacity: dim ? 0.45 : 1 }}>
      <rect x={x} y={y} width="118" height="26" fill="var(--bg)" stroke={c} strokeWidth="1.5" strokeDasharray={dim ? '4 3' : 'none'} />
      <text x={x + 9} y={y + 17} fontFamily="var(--mono)" fontSize="11" fill="var(--ink)">{label}</text>
    </g>
  )
  return (
    <div className="mono">
      <span style={{ fontSize: 11, color: 'var(--muted)' }}>dg query --why D-4</span>
      <svg viewBox="0 0 320 170" width="100%" style={{ marginTop: 8 }}>
        <path d="M128 40 H160 V30 H186" stroke="var(--cy)" fill="none" />
        <path d="M128 40 H160 V90 H186" stroke="var(--cy)" fill="none" />
        <path d="M245 103 V128" stroke={stale ? 'var(--vi)' : 'var(--cy)'} fill="none" />
        {box(10, 27, 'D-1 sqlite', 'var(--cy)')}
        {box(186, 17, 'D-3 offline', 'var(--cy)')}
        {box(186, 77, 'D-4 sync', stale ? 'var(--vi)' : 'var(--cy)', stale)}
        {box(186, 128, 'D-6 postgres', stale ? 'var(--vi)' : 'var(--line2)')}
        {stale && <text x="10" y="150" fontFamily="var(--mono)" fontSize="10.5" fill="var(--vi)">⚠ D-6 contradicts D-1</text>}
      </svg>
    </div>
  )
}

function FeaturedCard({ p }) {
  return (
    <article className="panel runner card" style={{ '--rc': p.color, '--cc': p.color, '--rd': p.id === 'overseer' ? '7s' : '9s' }}>
      <Runner />
      <div className="pixel-edge" style={{ '--ec': p.color }} />
      <div className="feat">
        <div style={{ padding: '30px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="mono" style={{ fontSize: 11.5, letterSpacing: '0.16em', color: p.color }}>{p.num} / {p.kind}</span>
            <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.12em', padding: '2px 7px', background: 'var(--vi)', color: '#07080D', fontWeight: 700 }}>NEW</span>
          </div>
          <h3 className="pixel" style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--vi)', margin: 0, lineHeight: 1 }}>{p.title}</h3>
          <p className="mono" style={{ fontSize: 13, color: p.color, margin: 0 }}>{p.tagline}</p>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--soft)', margin: 0 }}>{p.desc}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {p.chips.map(c => <span key={c} className="chip" style={{ '--cc': p.color }}>{c}</span>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 6 }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{p.stack}</span>
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="link-arrow" style={{ '--lc': 'var(--am)' }}>view repo ▸</a>
          </div>
        </div>
        <div style={{ borderLeft: '1px solid var(--line)', background: 'var(--bg)', padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {p.id === 'overseer' ? <OverseerVis /> : <DecisionVis />}
        </div>
      </div>
    </article>
  )
}

/* ── More work ────────────────────────────────────────────────────────── */
const PROJECTS_BY_NAME = [
  {
    name: 'Threadfall: The Shattered Pact',
    kind: 'CAUSAL ENGINE · LLM NARRATION',
    tagline: 'Every choice pulls a thread.',
    problem: `LLMs lose track of world state in long-running interactive systems — they contradict themselves, drift, and hallucinate continuity. Most "AI games" hand both decision-making and narration to the model, leaving state unreliable.`,
    approach: `A clean architectural boundary: a deterministic causal engine (pgmpy-based probabilistic DAG) owns all world state and consequences. The LLM is restricted strictly to narration and never makes a decision. Every player choice propagates through the causal graph — the world stays consistent across arbitrarily long sessions.`,
    stack: ['Python', 'FastAPI', 'pgmpy', 'React', 'Tailwind', 'HuggingFace'],
    github: 'https://github.com/DEMONKINGKAI/Threadfall',
    demo: null,
  },
  {
    name: 'Causeway',
    kind: 'STRUCTURAL CAUSAL MODELS',
    tagline: 'A structured path from raw data to true causes.',
    problem: `Most ML finds correlations — not causes. There was no single Python framework that took raw data all the way through causal discovery, do-calculus identification, counterfactual reasoning, and interactive intervention, all grounded in Pearl's formal theory.`,
    approach: `Built a complete structural causal modelling framework from first principles. Given any dataset (tabular, text, image, or time series), Causeway discovers the causal DAG via PC, NOTEARS, or DirectLiNGAM; fits structural equations from data; estimates ATE/CATE with doubly-robust estimators; and answers counterfactuals via the AAP abduction–action–prediction procedure — including the legal "but for" test with PN/PS/PNS bounds. A two-tab Dash app lets you apply live do(X=v) interventions, inspect fitted equations node-by-node, run d-separation queries, and even extract a causal graph from a hand-drawn diagram image via a vision LLM.`,
    stack: ['Python', 'pgmpy', 'DoWhy', 'networkx', 'scikit-learn', 'PyTorch', 'Dash', 'SciPy'],
    github: 'https://github.com/DEMONKINGKAI/Causeway',
    demo: null,
  },
  {
    name: 'NeuMF Genre-Aware Movie Recommender',
    kind: 'RECOMMENDER SYSTEMS · NLP',
    metrics: ['25M ratings'],
    tagline: 'Describe a mood. Get a list that fits.',
    problem: `Conventional recommenders force users into rigid genre filters or rely on opaque collaborative signals. This bridges natural-language intent and collaborative filtering: a user describes a mood instead of picking a category, while recommendations stay personalized to their taste.`,
    approach: `A NeuMF backbone fuses Generalized Matrix Factorization (linear interactions) with an MLP (non-linear interactions), extended with a genre-aware projection and an optional intent tower. At serving time, an NLP layer embeds the query with sentence-transformers, steers it toward learned genre centroids, detects emotional affect with keyword-aware boosting, and combines the model score with genre, embedding-similarity, and popularity signals. The training pipeline keys item embeddings by item rather than per-interaction with lazy lookup in the data loader, which removed an out-of-memory bottleneck on the 25M-rating dataset.`,
    stack: ['Deep Learning', 'Recommender Systems', 'NLP', 'PyTorch', 'FastAPI'],
    github: 'https://github.com/DEMONKINGKAI/NeuMF-Movie-Recommendation-Engine',
    demo: null,
  },
  {
    name: 'pharmacausal',
    kind: 'CAUSAL DISCOVERY · PHARMACOVIGILANCE',
    metrics: ['422k reports', '67% FCI precision', 'SIDER-validated'],
    tagline: 'Causal discovery over FDA adverse-event reports.',
    problem: `Naive drug–adverse-event co-occurrence in spontaneous-reporting data is confounded: sicker patients get more drugs and have more adverse events. Standard association mining can't separate pharmacological signal from this bias.`,
    approach: `ETL and feature-engineering pipeline over 422k FDA FAERS cases, followed by PC and FCI causal discovery with tiered background knowledge (demographics → indication → drug → event) to surface drug→event hypotheses that survive confounder adjustment. Validated against SIDER (the structured side-effect database), and — critically — explicit about where FAERS breaks the algorithms' assumptions: no unexposed population, and selection-into-the-dataset as a collider. Recovered standout signals including ROSUVASTATIN→Myalgia (textbook statin effect) and MEDROXYPROGESTERONE→Meningioma (an active pharmacovigilance signal). Ships with an interactive HTML visualisation of PC/FCI graphs coloured by SIDER status.`,
    stack: ['Python', 'pgmpy', 'pandas', 'scipy', 'FAERS', 'SIDER'],
    github: 'https://github.com/DEMONKINGKAI/pharmacausal',
    demo: null,
  },
  {
    name: 'evidentia',
    kind: 'BAYESIAN NETWORKS · EXPLAINABILITY',
    metrics: ['895 nodes', 'ECE 0.0036', '134,529 test patients'],
    tagline: 'Every probability update is traceable to the evidence that caused it.',
    problem: `Medical diagnostic tools are classified high-risk under the EU AI Act, which mandates explainability. A black-box classifier can't satisfy this — but a Bayesian network's reasoning trace can.`,
    approach: `Built on DDXPlus (a public dataset of 134k synthetic patient profiles with ground-truth differential diagnoses), Evidentia fits a Bayesian Network whose CPTs are learned from data. The inference engine updates posteriors sequentially as symptoms are entered, and an explainability layer attributes each posterior shift to the specific evidence that caused it — fully traceable. Calibrated with Brier score and reliability diagrams (0.0156 Brier at full evidence, vs. 0.6665 for the DDXPlus baseline). Ships with a FastAPI backend and a React frontend with an interactive DAG and live probability bars.`,
    stack: ['Python', 'pgmpy', 'FastAPI', 'React', 'DDXPlus', 'scikit-learn'],
    github: 'https://github.com/DEMONKINGKAI/evidentia',
    demo: null,
  },
  {
    name: 'fons iuris',
    kind: 'LEGAL RAG · NLI VERIFICATION',
    metrics: ['EUR-Lex corpus', 'NLI-verified'],
    tagline: 'Every claim must be entailed by the article it cites.',
    problem: `LLMs hallucinate specific clause numbers and legal requirements when asked about GDPR and AI Act compliance — a genuinely costly failure mode if anyone trusts the output for real regulatory decisions.`,
    approach: `RAG pipeline over a committed EUR-Lex corpus where every generated claim must be verifiably entailed by the specific article and paragraph it cites. An NLI verification layer flags claims that aren't grounded, making hallucinations visible rather than silent. Full-stack: FastAPI retrieval and generation backend with two local transformer models, React chat frontend, and Docker deployment. Ships with an eval suite covering both retrieval precision and entailment accuracy.`,
    stack: ['Python', 'FastAPI', 'React', 'ChromaDB', 'HuggingFace', 'Docker'],
    github: 'https://github.com/DEMONKINGKAI/fons-iuris',
    demo: null,
  },
]


// display order
const ORDER = ['Threadfall: The Shattered Pact', 'pharmacausal', 'evidentia', 'fons iuris', 'Causeway', 'NeuMF Genre-Aware Movie Recommender']
const PROJECTS = ORDER.map(n => PROJECTS_BY_NAME.find(p => p.name === n))


function ProjectCard({ p, i }) {
  const color = ['var(--vi)', 'var(--am)', 'var(--cy)'][i % 3]
  const links = [
    ...(p.links || []),
    ...(p.github ? [{ label: 'repo', href: p.github, icon: 'gh' }] : []),
    ...(p.demo ? [{ label: 'demo', href: p.demo, icon: 'external' }] : []),
  ]
  return (
    <article className="panel card" style={{ '--cc': color, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color }}>{String(i + 3).padStart(2, '0')} / {p.kind}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 20, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em' }}>{p.name}</h3>
      <p className="mono" style={{ fontSize: 12, color, margin: 0 }}>{p.tagline}</p>
      {p.metrics && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.metrics.map(m => <span key={m} className="chip" style={{ '--cc': color, fontSize: 11, padding: '4px 9px' }}>{m}</span>)}
        </div>
      )}
      <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--soft)', margin: 0 }}>{p.problem}</p>
      <details>
        <summary className="mono" style={{ fontSize: 11.5, color: 'var(--muted)', padding: '4px 0' }}>
          <span className="chev" style={{ color }}>▸</span> the approach
        </summary>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--soft)', margin: '10px 0 0' }}>{p.approach}</p>
      </details>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 'auto', paddingTop: 4, alignItems: 'center' }}>
        {links.length === 0 && <span className="mono faint" style={{ fontSize: 11 }}>private repo</span>}
        {links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="link-arrow"
            style={{ '--lc': 'var(--soft)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {l.icon === 'db' ? <Database size={12} /> : l.icon === 'gh' ? <GithubIcon size={12} /> : <ExternalLink size={12} />}
            {l.label} ▸
          </a>
        ))}
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionTitle number="03" label="Featured work" color="var(--vi)" sub="newest first: tools that make AI agents inspectable" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 56 }}>
          {FEATURED.map(p => <FeaturedCard key={p.id} p={p} />)}
        </div>

        <p className="mono" style={{ fontSize: 12.5, color: 'var(--muted)', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="cy">❯</span> ls ~/projects --causal --grounded
          <span style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 18, alignItems: 'stretch' }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
        </div>
        <p className="mono" style={{ fontSize: 12.5, color: 'var(--muted)', margin: '22px 0 0', lineHeight: 1.8 }}>
          <span style={{ color: '#C9D1E0' }}>◉ Kaggle silver medal</span> for a loan-approval dataset I engineered and published, plus a{' '}
          six-algorithm benchmark notebook on it:{' '}
          <a className="link-arrow" style={{ '--lc': 'var(--am)' }} href="https://www.kaggle.com/datasets/architsharma01/loan-approval-prediction-dataset" target="_blank" rel="noopener noreferrer">dataset ▸</a>{' '}
          <a className="link-arrow" style={{ '--lc': 'var(--am)' }} href="https://www.kaggle.com/code/architsharma01/loan-approval-prediction" target="_blank" rel="noopener noreferrer">notebook ▸</a>
        </p>
      </div>
    </section>
  )
}
