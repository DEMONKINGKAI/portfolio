import { useEffect, useState } from 'react'
import CausalDAG, { PROJECTS, SKILLS } from './CausalDAG'

const COLORS = ['var(--cy)', 'var(--vi)', 'var(--am)']

function useIsSmall() {
  const q = '(max-width: 880px)'
  const [small, setSmall] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = e => setSmall(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return small
}

// Compact project → skills list for phones (the full graph is unreadable that narrow)
function SkillList() {
  return (
    <div style={{ padding: '6px 18px 14px' }}>
      {PROJECTS.map((p, i) => {
        const c = p.isNew ? 'var(--vi)' : COLORS[i % 3]
        const skills = SKILLS.filter(s => s.projects.includes(p.id))
        return (
          <div key={p.id} style={{ padding: '14px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
            <div className="mono" style={{ fontSize: 13, color: 'var(--ink)', marginBottom: 9, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, background: c }} />
              {Array.isArray(p.label) ? p.label.join(' ') : p.label}
              {p.isNew && <span style={{ fontSize: 9, padding: '1px 5px', background: 'var(--vi)', color: '#07080D', fontWeight: 700 }}>NEW</span>}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map(s => (
                <span key={s.id} className="tag" style={s.projects.length > 1 ? { borderColor: c, color: 'var(--ink)' } : undefined}>
                  {Array.isArray(s.label) ? s.label.join(' ').replace('. ', '.') : s.label}
                </span>
              ))}
            </div>
          </div>
        )
      })}
      <p className="mono" style={{ fontSize: 11, color: 'var(--faint)', margin: '6px 0 0' }}>highlighted = shared across projects</p>
    </div>
  )
}

export default function SkillGraph() {
  const small = useIsSmall()
  return (
    <section id="graph" style={{ paddingTop: 28 }}>
      <div className="wrap">
        <div className="panel">
          <div className="term-bar" style={{ flexWrap: 'wrap' }}>
            <span>skill_graph.render()</span>
            {!small && <span style={{ marginLeft: 'auto' }}><span className="cy">hover a project</span> to light up the skills that power it</span>}
          </div>
          {small ? <SkillList /> : (
            <div style={{ height: 'clamp(520px, 50vw, 620px)', padding: '28px 36px 20px' }}>
              <CausalDAG />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
