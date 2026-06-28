import { ExternalLink, Database } from 'lucide-react'
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
    github: 'https://github.com/DEMONKINGKAI/Threadfall',
    demo: null,
  },
  {
    name: 'Causeway',
    tagline: 'A structured path from raw data to true causes.',
    featured: false,
    problem: `Most ML finds correlations — not causes. There was no single Python framework that took raw data all the way through causal discovery, do-calculus identification, counterfactual reasoning, and interactive intervention, all grounded in Pearl's formal theory.`,
    approach: `Built a complete structural causal modelling framework from first principles. Given any dataset (tabular, text, image, or time series), Causeway discovers the causal DAG via PC, NOTEARS, or DirectLiNGAM; fits structural equations from data; estimates ATE/CATE with doubly-robust estimators; and answers counterfactuals via the AAP abduction–action–prediction procedure — including the legal "but for" test with PN/PS/PNS bounds. A two-tab Dash app lets you apply live do(X=v) interventions, inspect fitted equations node-by-node, run d-separation queries, and even extract a causal graph from a hand-drawn diagram image via a vision LLM.`,
    stack: ['Python', 'pgmpy', 'DoWhy', 'networkx', 'scikit-learn', 'PyTorch', 'Dash', 'SciPy'],
    github: 'https://github.com/DEMONKINGKAI/Causeway',
    demo: null,
  },
  {
    name: 'NeuMF Genre-Aware Movie Recommender',
    tagline: 'Describe a mood. Get a list that fits.',
    featured: false,
    problem: `Conventional recommenders force users into rigid genre filters or rely on opaque collaborative signals. This bridges natural-language intent and collaborative filtering: a user describes a mood instead of picking a category, while recommendations stay personalized to their taste.`,
    approach: `A NeuMF backbone fuses Generalized Matrix Factorization (linear interactions) with an MLP (non-linear interactions), extended with a genre-aware projection and an optional intent tower. At serving time, an NLP layer embeds the query with sentence-transformers, steers it toward learned genre centroids, detects emotional affect with keyword-aware boosting, and combines the model score with genre, embedding-similarity, and popularity signals. The training pipeline keys item embeddings by item rather than per-interaction with lazy lookup in the data loader, which removed an out-of-memory bottleneck on the 25M-rating dataset.`,
    stack: ['Deep Learning', 'Recommender Systems', 'NLP', 'PyTorch', 'FastAPI'],
    github: 'https://github.com/DEMONKINGKAI/NeuMF-Movie-Recommendation-Engine',
    demo: null,
  },
  {
    name: 'Loan Approval Prediction Dataset',
    tagline: 'A clean, reproducible benchmark for credit risk ML.',
    featured: false,
    medal: 'silver',
    problem: `Most publicly available loan datasets are poorly documented, synthetically generated, or lack the feature diversity needed to train robust credit risk models. Researchers building approval classifiers had no reliable open benchmark to work from.`,
    approach: `Engineered a custom dataset from real-world loan application data — systematically extracting features across applicant demographics, income, credit history, debt ratios, and collateral. Applied missing value imputation, outlier removal, and class balancing to produce a clean, model-ready corpus. Published on Kaggle with full documentation, feature descriptions, and a reproducible preprocessing pipeline so the broader ML community could validate and build on it.`,
    stack: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Matplotlib', 'Kaggle'],
    github: null,
    demo: null,
    links: [{ label: 'dataset', href: 'https://www.kaggle.com/datasets/architsharma01/loan-approval-prediction-dataset', icon: 'db' }],
  },
  {
    name: 'Loan Approval Prediction Model',
    tagline: 'Six algorithms. One benchmark. Full transparency.',
    featured: false,
    problem: `Credit risk models are typically trained on a single algorithm with no comparison baseline, making it hard to understand which approach actually performs best — and why. Black-box approval decisions erode trust in financial AI.`,
    approach: `Benchmarked six classification algorithms — Logistic Regression, Random Forest, XGBoost, SVM, KNN, and Decision Tree — on the custom loan dataset. Each model was tuned via cross-validation with full hyperparameter grids. The notebook includes feature importance analysis, precision/recall/F1 comparisons, confusion matrices, and ROC curves, giving a transparent view of where each algorithm wins and where it fails on credit data.`,
    stack: ['Python', 'scikit-learn', 'XGBoost', 'Pandas', 'Matplotlib', 'Seaborn', 'Kaggle'],
    github: null,
    demo: null,
    links: [{ label: 'notebook', href: 'https://www.kaggle.com/code/architsharma01/loan-approval-prediction', icon: 'external' }],
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
    <article className="project-card" style={cardStyle}>
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

      {p.medal === 'silver' && (
        <span
          title="Kaggle Silver Medal"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#94A3B8',
            background: 'rgba(148,163,184,0.10)',
            border: '1px solid rgba(148,163,184,0.25)',
            padding: '3px 9px 3px 7px',
            borderRadius: 3,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" fill="rgba(148,163,184,0.3)" stroke="#94A3B8" strokeWidth="2"/>
            <circle cx="12" cy="12" r="6" fill="#94A3B8" opacity="0.6"/>
          </svg>
          silver medal
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

      <div style={{ display: 'flex', gap: 10, marginTop: 4, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Custom links array (e.g. Kaggle) */}
        {p.links && p.links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', textDecoration: 'none', padding: '6px 12px', border: '1px solid var(--line)', borderRadius: 5, background: 'transparent', transition: 'color 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--line)' }}
          >
            {l.icon === 'db' ? <Database size={12} /> : <ExternalLink size={12} />}
            {l.label}
          </a>
        ))}
        {/* Standard github/demo links */}
        {!p.links && !p.github && !p.demo && (
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--faint)', border: '1px solid var(--line)', padding: '3px 9px', borderRadius: 3, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            private repo
          </span>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', textDecoration: 'none', padding: '6px 12px', border: '1px solid var(--line)', borderRadius: 5, background: 'transparent', transition: 'color 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--line)' }}
          >
            <GithubIcon size={12} /> repo
          </a>
        )}
        {p.demo && (
          <a href={p.demo} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', textDecoration: 'none', padding: '6px 12px', border: '1px solid var(--line)', borderRadius: 5, background: 'transparent', transition: 'color 0.15s, border-color 0.15s' }}
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
        padding: '80px 24px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <SectionEyebrow label="selected work" number="02" />
      <h2
        className="section-heading"
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
