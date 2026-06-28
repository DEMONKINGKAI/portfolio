import SectionEyebrow from './SectionEyebrow'

const ROLES = [
  {
    title: 'Product Engineer',
    company: 'EffiGO Global',
    location: 'Hyderabad, India',
    period: 'Jun 2024 – Jul 2025',
    summary: 'Procurement and supply-chain teams were spending hours manually drafting RFQs, contracts, and vendor documents — error-prone, slow, and impossible to scale. I built the AI layer that eliminated that bottleneck.',
    sections: [
      {
        label: 'what i built',
        items: [
          'Designed and developed NLP-based document generation pipelines that produced structured RFQs, contracts, and procurement documents from unstructured inputs — replacing manual drafting end-to-end.',
          'Built generative AI applications on Gemini and Amazon Titan, integrating LLM layers into production product workflows for automated contract automation and vendor communication.',
          'Architected end-to-end AI pipelines using serverless architectures and containerized microservices on Google Cloud Vertex AI, Amazon Bedrock, and AWS SageMaker across GCP, AWS, and Azure.',
          'Collaborated on React and Spring Boot frontends, integrating AI-powered chatbot and conversational interfaces directly into the product UI.',
        ],
      },
      {
        label: 'how it solved the problem',
        items: [
          'Document generation that previously took hours was reduced to seconds — the model ingested raw vendor data and produced compliant, formatted output ready for sign-off.',
          'Serverless and containerized deployment meant the system scaled with demand without operational overhead; the MLOps lifecycle (versioning, monitoring, continuous training, automated deployment) kept models fresh without manual intervention.',
          'Multi-cloud architecture ensured no single-vendor lock-in and met enterprise compliance requirements across regions.',
        ],
      },
    ],
    stack: ['Python', 'Gemini', 'Amazon Titan', 'Vertex AI', 'Bedrock', 'SageMaker', 'FastAPI', 'React', 'Spring Boot', 'Docker', 'GCP', 'AWS', 'Azure'],
  },
  {
    title: 'Product Engineer Intern',
    company: 'EffiGO Global',
    location: 'Bengaluru, India',
    period: 'Feb 2024 – May 2024',
    summary: 'The support team was overwhelmed by repetitive customer queries, and the finance team was manually keying in invoice data — both high-volume, low-value tasks that were obvious candidates for automation.',
    sections: [
      {
        label: 'what i built',
        items: [
          'Developed a chatbot application for automated query resolution, handling common end-user support requests without human intervention using intent classification and response generation.',
          'Engineered an OCR-based pipeline for automated invoice processing — extracting line items, amounts, and vendor details from scanned documents and matching them against purchase orders.',
          'Trained in Spring Boot application development and RESTful API design, contributing to backend services that powered both the chatbot and OCR integrations.',
        ],
      },
      {
        label: 'how it solved the problem',
        items: [
          'The chatbot deflected a significant share of repetitive support tickets, freeing the support team to focus on complex cases that required human judgment.',
          'OCR-based invoice matching eliminated manual data entry from the accounts payable workflow — documents went from scan to matched PO record automatically, cutting processing time and reducing keying errors.',
        ],
      },
    ],
    stack: ['Python', 'Spring Boot', 'OCR', 'NLP', 'RESTful APIs', 'Java'],
  },
  {
    title: 'ML & Data Analytics Intern',
    company: 'Axisray',
    location: 'Ahmedabad, India',
    period: 'Jun 2023 – Jul 2023',
    summary: 'Financial lenders were relying on slow, inconsistent manual credit assessment processes that lacked data-driven grounding and struggled with class imbalance in approval datasets. I built the ML foundation to change that.',
    sections: [
      {
        label: 'what i built',
        items: [
          'Conducted in-depth research into loan approval models and industry credit-scoring practices, identifying the most predictive features across applicant demographics, financial history, and debt ratios.',
          'Engineered a custom loan prediction dataset from scratch — handling feature extraction, missing value imputation, outlier detection, and class imbalance correction — to produce a clean, model-ready training corpus.',
          'Implemented and benchmarked multiple supervised ML prediction models (Random Forest, XGBoost, Logistic Regression, SVM), tuning hyperparameters via cross-validation to achieve high accuracy and recall on the minority class.',
          'Applied ML algorithms across multiple real-world business datasets, translating raw tabular data into actionable classification and regression outputs for business decision-making.',
          'Developed generative AI models — Variational Autoencoders (VAEs) for synthetic data augmentation of underrepresented loan applicant profiles, GANs for generating realistic financial data samples to stress-test model robustness, and a speech recognition prototype for voice-driven data entry interfaces.',
          'Published the complete engineered dataset and trained models on Kaggle, documenting methodology, feature importance analysis, and reproducible training pipelines for the ML community.',
        ],
      },
      {
        label: 'how it solved the problem',
        items: [
          'ML-based approval models replaced manual scoring with consistent, data-driven predictions — removing human bias and cutting assessment time from days to seconds.',
          'Synthetic data generation via VAEs and GANs directly addressed the class imbalance problem, improving model recall on loan rejections and reducing false approvals.',
          'Kaggle publication created a public benchmark dataset, enabling external validation and positioning the work as a reproducible reference for financial ML research.',
        ],
      },
    ],
    stack: ['Python', 'scikit-learn', 'XGBoost', 'TensorFlow', 'PyTorch', 'VAE', 'GAN', 'Pandas', 'NumPy', 'Matplotlib', 'Kaggle'],
  },
]

function Chip({ label }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      padding: '2px 8px',
      borderRadius: 4,
      background: 'var(--bg)',
      border: '1px solid var(--line)',
      color: 'var(--muted)',
      display: 'inline-block',
    }}>
      {label}
    </span>
  )
}

function RoleCard({ role, index }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 8,
        padding: '32px 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            color: 'var(--ink)',
            margin: '0 0 4px',
          }}>
            {role.title}
          </h3>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: 'var(--accent)',
            margin: '0 0 2px',
          }}>
            {role.company}
          </p>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--faint)',
            margin: 0,
          }}>
            {role.location}
          </p>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--faint)',
          whiteSpace: 'nowrap',
          paddingTop: 2,
        }}>
          {role.period}
        </span>
      </div>

      {/* Summary */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        lineHeight: 1.65,
        color: 'var(--muted)',
        margin: 0,
        paddingBottom: 16,
        borderBottom: '1px solid var(--line)',
        fontStyle: 'italic',
      }}>
        {role.summary}
      </p>

      {/* Sections */}
      {role.sections.map(sec => (
        <div key={sec.label}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: 'var(--faint)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: '0 0 12px',
          }}>
            {sec.label}
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sec.items.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{
                  flexShrink: 0,
                  width: 5, height: 5,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  marginTop: 9,
                }} />
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: 'var(--muted)',
                  margin: 0,
                }}>
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 4 }}>
        {role.stack.map(s => <Chip key={s} label={s} />)}
      </div>
    </div>
  )
}

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 800 }}>
        {ROLES.map((role, i) => <RoleCard key={i} role={role} index={i} />)}
      </div>
    </section>
  )
}
