import SectionEyebrow from './SectionEyebrow'

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '80px 24px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <div style={{ maxWidth: 680 }}>
        <SectionEyebrow label="about" number="01" />

        <h2
          className="section-heading"
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
            `I'm an AI/ML engineer with an MSc in Artificial Intelligence & Machine Learning, based in Germany. My work spans the full stack of applied ML — NLP pipelines, generative-AI on Gemini and Amazon Titan, computer vision with CNNs and ViTs, reinforcement learning for sequential decision-making, and MLOps across GCP, AWS, and Azure. I'm comfortable taking a model from research prototype to production API.`,
            `My interests span multiple paradigms. In language and vision I work with LLMs, RAG pipelines, multimodal models that reason jointly over text and images, and systems for document understanding and visual QA. In RL I work with policy gradient methods, Q-learning, and model-based approaches — particularly where RL intersects with causal reasoning to produce agents that can plan and adapt rather than just react. On the structured side: causal inference, recommender systems, and representation learning.`,
            `Across all of this, I default to a clean separation of concerns — deterministic logic owns state and decisions; learned models handle perception and language. Systems that reason explicitly are easier to audit, extend, and trust, whether the input is a sentence, an image, or an environment observation.`,
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
