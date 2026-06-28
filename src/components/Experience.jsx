import SectionEyebrow from './SectionEyebrow'

const BULLETS = [
  'Built NLP-based document-generation pipelines, automating structured output from unstructured inputs at scale.',
  'Developed generative-AI applications on Gemini and Amazon Titan, integrating LLM layers into production product workflows.',
  'Designed and maintained MLOps pipelines and multi-cloud deployments across GCP, AWS, and Azure.',
]

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: '80px 24px',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <SectionEyebrow label="experience" number="03" />
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
        Where I've worked
      </h2>

      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          padding: '32px 36px',
          maxWidth: 720,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 24,
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--ink)',
                margin: '0 0 4px',
              }}
            >
              Product Engineer
            </h3>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: 'var(--accent)',
                margin: 0,
              }}
            >
              EffiGO Global
            </p>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: 'var(--faint)',
              whiteSpace: 'nowrap',
            }}
          >
            Previously
          </span>
        </div>

        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {BULLETS.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  marginTop: 9,
                }}
              />
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: 'var(--muted)',
                  margin: 0,
                }}
              >
                {b}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
