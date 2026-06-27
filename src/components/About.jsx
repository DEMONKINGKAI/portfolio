import SectionEyebrow from './SectionEyebrow'

export default function About() {
  return (
    <section
      id="about"
      style={{
        borderTop: '1px solid var(--line)',
        padding: '80px 24px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <div style={{ maxWidth: 680 }}>
        <SectionEyebrow label="about" />

        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 32,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            margin: '0 0 32px',
          }}
        >
          Building systems that reason, not just generate.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            `I'm an AI/ML engineer and MSc candidate in Artificial Intelligence & Machine Learning, graduating mid-2026 from Germany. My background spans product engineering and applied ML — I've shipped NLP document-generation pipelines, built generative-AI applications on Gemini and Amazon Titan, and designed MLOps pipelines across GCP, AWS, and Azure.`,
            `My current research and engineering focus is causal inference: DAGs, d-separation, the do-calculus, structural causal models, and discovery algorithms (PC, NOTEARS, DirectLiNGAM). I'm particularly interested in causal representation learning — CausalVAE, CITRIS, BISCUIT — and Halpern–Pearl actual causality, which gives a rigorous language for counterfactual claims.`,
            `The thread running through my projects is a deliberate separation of concerns: a deterministic causal engine owns state and consequence; an LLM handles narration or interface. This isn't a philosophical position so much as a practical one — it's the architecture that stays inspectable and consistent as systems scale in complexity.`,
          ].map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                lineHeight: 1.75,
                color: 'var(--muted)',
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
