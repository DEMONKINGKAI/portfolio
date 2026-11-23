import SectionTitle from './SectionEyebrow'

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

const COLORS = ['var(--cy)', 'var(--vi)', 'var(--am)']

function RoleCard({ role, index }) {
  const c = COLORS[index % 3]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 18 }}>
      {/* timeline rail */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ width: 14, height: 14, border: `2px solid ${c}`, background: index === 0 ? c : 'var(--bg)', boxShadow: `0 0 12px ${c}`, marginTop: 28, flexShrink: 0 }} />
        <span style={{ width: 2, flex: 1, background: 'repeating-linear-gradient(180deg, var(--line2) 0 6px, transparent 6px 10px)', marginTop: 8 }} />
      </div>
      <article className="panel card" style={{ '--cc': c, padding: '26px 28px', marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 20, color: 'var(--ink)', margin: '0 0 4px' }}>{role.title}</h3>
            <p className="mono" style={{ fontSize: 12.5, margin: 0 }}>
              <span style={{ color: c }}>@ {role.company}</span> <span className="faint">·</span> <span className="muted">{role.location}</span>
            </p>
          </div>
          <span className="mono" style={{ fontSize: 11.5, color: c, border: `1px solid ${c}`, padding: '4px 10px', background: `color-mix(in srgb, ${c} 8%, transparent)` }}>{role.period}</span>
        </div>
        <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--soft)', margin: '0 0 14px' }}>{role.summary}</p>
        {role.sections.map((sec, si) => (
          <details key={sec.label} open={index === 0 && si === 0} style={{ borderTop: '1px solid var(--line)', padding: '10px 0' }}>
            <summary className="mono" style={{ fontSize: 11.5, color: 'var(--muted)', letterSpacing: '0.06em' }}>
              <span className="chev" style={{ color: c }}>▸</span> {sec.label}
            </summary>
            <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sec.items.map((it, k) => (
                <li key={k} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.65, color: 'var(--soft)' }}>
                  <span className="mono" style={{ color: c, flexShrink: 0 }}>›</span>{it}
                </li>
              ))}
            </ul>
          </details>
        ))}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
          {role.stack.map(s => <span key={s} className="tag">{s}</span>)}
        </div>
      </article>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionTitle number="04" label="Experience" color="var(--cy)" sub="git log --author=kai --industry" />
        <div>
          {ROLES.map((r, i) => <RoleCard key={r.title + r.period} role={r} index={i} />)}
        </div>
      </div>
    </section>
  )
}
