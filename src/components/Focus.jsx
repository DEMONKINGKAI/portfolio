import SectionEyebrow from './SectionEyebrow'

const GROUPS = [
  {
    title: 'Causal Inference & PGMs',
    items: [
      'DAGs & d-separation',
      'Do-calculus (Pearl)',
      'Backdoor / frontdoor criteria',
      'Structural causal models',
      'PC / FCI / GES algorithms',
      'NOTEARS / DirectLiNGAM',
      'Markov equivalence classes',
      'Halpern–Pearl causality',
      'CausalVAE / CITRIS / BISCUIT',
    ],
  },
  {
    title: 'Generative AI & NLP',
    items: [
      'LLM application architecture',
      'Multimodal LLMs (vision + language)',
      'RAG-style pipelines',
      'Document generation',
      'Visual question answering',
      'VAEs · GANs · Diffusion Models',
      'HuggingFace ecosystem',
      'Gemini · Amazon Titan · GPT-4o',
      'Prompt engineering',
    ],
  },
  {
    title: 'Data Science & Analytics',
    items: [
      'Feature engineering & selection',
      'Class imbalance handling',
      'Supervised & unsupervised ML',
      'XGBoost · Random Forest · SVM',
      'Synthetic data generation',
      'Kaggle · reproducible pipelines',
      'Pandas · NumPy · Matplotlib',
      'Statistical modelling',
    ],
  },
  {
    title: 'Computer Vision',
    items: [
      'CNNs · ResNet · ViT',
      'Image classification & embedding',
      'Feature extraction (torchvision)',
      'Multimodal grounding',
      'Document understanding',
      'Image-text retrieval',
    ],
  },
  {
    title: 'Reinforcement Learning',
    items: [
      'Policy gradient (PPO · A3C)',
      'Q-learning · DQN',
      'Model-based RL',
      'Causal RL & planning',
      'Reward shaping',
      'Gymnasium / OpenAI Gym',
    ],
  },
  {
    title: 'MLOps & Engineering',
    items: [
      'GCP · AWS · Azure',
      'Multi-cloud deployments',
      'ML pipeline design',
      'FastAPI · Python',
      'PyTorch',
      'pgmpy · DoWhy',
      'React · Tailwind',
    ],
  },
]

function Tag({ label }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        padding: '5px 10px',
        borderRadius: 4,
        border: '1px solid var(--line)',
        background: 'var(--surface)',
        color: 'var(--muted)',
        display: 'inline-block',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {label}
    </span>
  )
}

export default function Focus() {
  return (
    <section
      id="focus"
      style={{
        padding: '80px 24px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <SectionEyebrow label="focus" number="04" />
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
        Expertise
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 28,
        }}
      >
        {GROUPS.map(g => (
          <div key={g.title}>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: 'var(--ink)',
                margin: '0 0 14px',
                paddingBottom: 10,
                borderBottom: '1px solid var(--line)',
              }}
            >
              {g.title}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {g.items.map(item => <Tag key={item} label={item} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
