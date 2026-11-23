import Runner from './Runner'
import SectionTitle from './SectionEyebrow'

const C = { k: 'var(--cy)', p: 'var(--faint)', t: 'var(--ink)', a: 'var(--am)', v: 'var(--vi)', m: 'var(--muted)' }

const LINES = [
  [['k', 'name'], ['p', ': '], ['a', `'Archit "Kai" Sharma'`]],
  [['k', 'study'], ['p', ': '], ['t', 'MSc AI & ML @ TU Darmstadt  '], ['m', '# grad 2027']],
  [['k', 'lab'], ['p', ': '], ['t', 'Multimodal AI Project Lab  '], ['m', '# Rohrbach groups']],
  [['k', 'before'], ['p', ': '], ['t', 'Product Engineer @ EffiGO '], ['m', '— '], ['t', 'GenAI + MLOps on GCP/AWS/Azure']],
  [['k', 'focus'], ['p', ': '], ['v', '['], ['t', 'causal inference, PGMs, grounded GenAI, neuro-symbolic'], ['v', ']']],
  [['k', 'now'], ['p', ': '], ['t', 'visual hallucinations in multimodal reasoning traces']],
  [['k', 'rule'], ['p', ': '], ['a', '"every claim traced back to its evidence"']],
  [['k', 'open_to'], ['p', ': '], ['v', '['], ['t', 'werkstudent (thesis-compatible), full-time 2027'], ['v', ']']],
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionTitle number="01" label="About" color="var(--cy)" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 28, alignItems: 'start' }}>
          {/* Terminal */}
          <div className="panel runner" style={{ '--rc': 'var(--cy)', '--rd': '10s' }}>
            <Runner />
            <div className="term-bar">
              <span className="dots"><i style={{ background: 'var(--cy)' }} /><i style={{ background: 'var(--vi)' }} /><i style={{ background: 'var(--am)' }} /></span>
              <span style={{ margin: '0 auto' }}>kai@darmstadt: ~/about</span>
            </div>
            <div className="mono" style={{ padding: '18px 18px 22px', fontSize: 12.5, lineHeight: 2 }}>
              <div><span className="cy">❯ </span><span style={{ color: 'var(--ink)' }}>cat about.yml</span></div>
              {LINES.map((segs, i) => (
                <div key={i} style={{ display: 'flex' }}>
                  <span style={{ color: 'var(--line2)', flex: '0 0 30px' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
                    {segs.map(([c, t], j) => <span key={j} style={{ color: C[c] }}>{t}</span>)}
                  </span>
                </div>
              ))}
              <div><span className="cy">❯ </span><span className="caret" /></div>
            </div>
          </div>

          {/* Prose */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: 15.5, lineHeight: 1.8, color: 'var(--soft)' }}>
            <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 26, lineHeight: 1.25, letterSpacing: '-0.01em', color: 'var(--ink)', margin: 0 }}>
              Building systems that <span className="cy">reason</span>, not just <span className="vi">generate</span>.
            </h3>
            <p style={{ margin: 0 }}>
              I'm an AI/ML engineer doing my MSc in Artificial Intelligence &amp; Machine Learning at TU Darmstadt.
              Before that I was a Product Engineer at EffiGO, shipping generative-AI products on Gemini and Amazon Titan
              and running the MLOps behind them across GCP, AWS and Azure. I'm comfortable taking a model from research
              prototype to production API.
            </p>
            <p style={{ margin: 0 }}>
              My default architecture is a clean separation of concerns: <span style={{ color: 'var(--ink)' }}>deterministic,
              inspectable logic owns state and decisions; learned models handle perception and language.</span> That shows
              up everywhere in my work, from Bayesian networks that attribute every posterior shift to its evidence, to RAG
              that NLI-checks each citation, to tooling that gives Claude a queryable memory of its own decisions.
            </p>
            <p style={{ margin: 0 }}>
              Hands-on with multimodal models too: I've fine-tuned CLIP for retrieval and worked with BLIP-2 and LLaVA, which
              feeds directly into my current lab work on where vision-language models stop seeing and start guessing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
