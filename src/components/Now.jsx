import Runner from './Runner'
import SectionTitle from './SectionEyebrow'

const LAB_POINTS = [
  'Faculty topic: visual hallucinations in multimodal reasoning traces',
  'Do vision-language models actually look at the image when they reason, or fill gaps with language priors?',
  'My workstream: intervention design and causal analysis, controlling for confounders instead of trusting attention maps',
  'Five-person team · experiments on the lab\'s ADA GPU cluster',
]

const ROWS = [
  { c: 'var(--am)', label: 'OPEN TO', title: 'Werkstudent ML/AI roles, full-time from 2027', sub: 'thesis-compatible · Darmstadt / remote', pct: 100 },
]

export default function Now() {
  return (
    <section id="now" className="section">
      <div className="wrap">
        <SectionTitle number="02" label="Currently" color="var(--am)" sub="what's on the bench right now" />

        {/* MAI Lab feature */}
        <article className="panel runner" style={{ '--rc': 'var(--cy)', '--rd': '8s', padding: 0, marginBottom: 20 }}>
          <Runner />
          <div className="pixel-edge" style={{ '--ec': 'var(--cy)' }} />
          <div className="feat">
            <div style={{ padding: '30px 32px' }}>
              <p className="mono" style={{ fontSize: 11.5, letterSpacing: '0.18em', color: 'var(--cy)', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, background: 'var(--cy)', animation: 'statusPulse 2s infinite' }} />
                RESEARCH · TU DARMSTADT · 2026/27
              </p>
              <h3 className="pixel" style={{ fontSize: 'clamp(22px, 3.2vw, 32px)', color: 'var(--ink)', margin: '0 0 8px', lineHeight: 1.1 }}>
                MAI Project Lab
              </h3>
              <p className="mono" style={{ fontSize: 13, color: 'var(--soft)', margin: '0 0 20px' }}>
                Project Lab Multimodal AI <span className="faint">·</span> Anna &amp; Marcus Rohrbach's groups
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {LAB_POINTS.map(p => (
                  <li key={p} style={{ display: 'flex', gap: 12, fontSize: 14.5, lineHeight: 1.6, color: 'var(--soft)' }}>
                    <span className="cy mono" style={{ flexShrink: 0 }}>▸</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            {/* visual: the question the project asks, as a check list */}
            <div style={{ borderLeft: '1px solid var(--line)', background: 'var(--bg)', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }} className="mono">
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>reasoning_trace.audit()</span>
              <div style={{ fontSize: 12.5, lineHeight: 1.9 }}>
                {[
                  ['cy', 'for each claim in the reasoning trace:'],
                  ['soft', '  is it supported by the image?'],
                  ['soft', '  does it survive an intervention'],
                  ['soft', '  on the evidence it relies on?'],
                  ['vi', '  no → flag as visual hallucination'],
                ].map(([c, t], i) => (
                  <div key={i} style={{ whiteSpace: 'pre-wrap', color: `var(--${c})` }}>{t}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 14px', fontSize: 11.5, marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                <span className="faint">status</span><span className="cy">in progress</span>
                <span className="faint">term</span><span className="soft">2026/27</span>
                <span className="faint">team</span><span className="soft">5 students · TU Darmstadt</span>
              </div>
            </div>
          </div>
        </article>

        {/* Other rows */}
        <div className="panel">
          {ROWS.map((r, i) => (
            <div key={r.label} className="now-row" style={{ display: 'grid', gap: 20, padding: '22px 26px', borderTop: i ? '1px solid var(--line)' : 'none', alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: 11.5, letterSpacing: '0.18em', color: r.c, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 9, height: 9, background: r.c, boxShadow: `0 0 10px ${r.c}` }} />{r.label}
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>{r.title}</div>
                <div className="mono" style={{ fontSize: 11.5, color: 'var(--muted)', margin: '4px 0 10px' }}>{r.sub}</div>
                <div className="pbar"><span style={{ '--pc': r.c, width: `${r.pct}%` }} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
