import Runner from './Runner'
import SectionTitle from './SectionEyebrow'

const STACK = [
  { name: 'MODELS & ML', c: 'var(--cy)', items: ['PyTorch', 'Transformers', 'TRL · PEFT', 'QLoRA', 'causal-learn', 'pgmpy · DoWhy', 'sentence-transformers'] },
  { name: 'SERVING & DATA', c: 'var(--vi)', items: ['FastAPI', 'Docker', 'llama.cpp', 'ChromaDB', 'pytest', 'Jupyter', 'Pandas · NumPy'] },
  { name: 'CLOUD & WEB', c: 'var(--am)', items: ['GCP', 'AWS', 'Azure', 'React', 'TypeScript', 'Vite', 'Tauri · Rust'] },
]

const GROUPS = [
  { title: 'Causal Inference & PGMs', c: 'var(--cy)', items: ['DAGs & d-separation', 'Do-calculus', 'Backdoor / frontdoor', 'Structural causal models', 'PC / FCI / GES', 'NOTEARS / DirectLiNGAM', 'Bayesian networks', 'Counterfactuals (PN/PS)'] },
  { title: 'Generative & Multimodal AI', c: 'var(--vi)', items: ['RAG + NLI verification', 'RLHF / DPO', 'CLIP · BLIP-2 · LLaVA', 'Hallucination analysis', 'VQA', 'VAEs · GANs · Diffusion', 'Gemini · Titan · GPT-4o', 'Agent tooling (Claude Code)'] },
  { title: 'Classic ML & RL', c: 'var(--am)', items: ['Feature engineering', 'XGBoost · RF · SVM', 'Class imbalance', 'Recommender systems', 'CNNs · ResNet · ViT', 'PPO · DQN', 'Model-based / causal RL'] },
  { title: 'MLOps & Engineering', c: 'var(--soft)', items: ['Multi-cloud deployment', 'Vertex AI · Bedrock · SageMaker', 'Serverless + containers', 'Model versioning & monitoring', 'Eval suites', 'Spring Boot'] },
]

export default function Focus() {
  return (
    <section id="toolkit" className="section">
      <div className="wrap">
        <SectionTitle number="05" label="Toolkit" color="var(--am)" sub="what I reach for" />

        {/* Stack panel */}
        <div className="panel runner" style={{ '--rc': 'var(--am)', '--rd': '12s', padding: '26px 28px', marginBottom: 22 }}>
          <Runner />
          {STACK.map(g => (
            <div key={g.name} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 170px) 1fr', gap: 16, alignItems: 'start', padding: '10px 0' }}>
              <span className="mono" style={{ fontSize: 11.5, letterSpacing: '0.16em', color: g.c, display: 'flex', alignItems: 'center', gap: 10, paddingTop: 7 }}>
                <span style={{ width: 8, height: 8, background: g.c }} />{g.name}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {g.items.map(it => <span key={it} className="chip" style={{ '--cc': g.c, color: 'var(--ink)', fontSize: 12.5 }}>{it}</span>)}
              </div>
            </div>
          ))}
          <div style={{ height: 2, margin: '14px 0', background: 'repeating-linear-gradient(90deg, var(--line) 0 6px, transparent 6px 10px)' }} />
          <p className="mono" style={{ fontSize: 12.5, color: 'var(--muted)', margin: 0, lineHeight: 1.7 }}>
            <span className="cy">core ▸</span> causal discovery · Bayesian networks · RAG verification · RLHF/DPO · <span className="vi">CLIP · BLIP-2 · LLaVA</span>
          </p>
        </div>

        {/* Expertise */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 18 }}>
          {GROUPS.map(g => (
            <div key={g.title} className="panel" style={{ padding: '20px 20px 22px' }}>
              <h4 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 14.5, color: 'var(--ink)', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, background: g.c }} />{g.title}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {g.items.map(item => <span key={item} className="tag">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
