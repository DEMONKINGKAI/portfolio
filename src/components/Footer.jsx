import { Mail, FileText, MapPin, Copy, Check } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useState } from 'react'
import Runner from './Runner'
import SectionTitle from './SectionEyebrow'

const EMAIL = 'sharmarchit.work@gmail.com'

const links = [
  { icon: GithubIcon,   label: 'github.com/DEMONKINGKAI', href: 'https://github.com/DEMONKINGKAI', c: 'var(--vi)' },
  { icon: LinkedinIcon, label: 'linkedin/archit-sharma-work', href: 'https://www.linkedin.com/in/archit-sharma-work/', c: 'var(--cy)' },
  { icon: FileText,     label: 'Archit_Sharma_CV.pdf', href: '/Archit_Sharma_CV.pdf', c: 'var(--am)' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section id="contact" className="section" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <SectionTitle number="06" label="Contact" color="var(--vi)" />

        <div className="panel runner" style={{ '--rc': 'var(--vi)', '--rd': '9s' }}>

          <Runner />
          <div className="term-bar">
            <span className="dots"><i style={{ background: 'var(--cy)' }} /><i style={{ background: 'var(--vi)' }} /><i style={{ background: 'var(--am)' }} /></span>
            <span style={{ margin: '0 auto' }}>kai@darmstadt: ~/contact</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 32, padding: '32px 32px 36px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 28, letterSpacing: '-0.01em', color: 'var(--ink)', margin: '0 0 12px' }}>
                Let's build something <span className="am">traceable</span>.
              </h3>
              <p style={{ fontSize: 15, color: 'var(--soft)', lineHeight: 1.7, margin: '0 0 24px', maxWidth: 440 }}>
                Open to Werkstudent ML/AI roles now (thesis-compatible) and full-time positions from 2027,
                in causal inference, multimodal AI and applied generative AI.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={`mailto:${EMAIL}`} className="btn primary"><Mail size={14} /> {EMAIL}</a>
                <button onClick={copyEmail} className="btn" aria-label="Copy email address">
                  {copied ? <><Check size={14} /> copied</> : <><Copy size={14} /> copy</>}
                </button>
              </div>
            </div>
            <div className="mono" style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}>
              {links.map(({ icon: Icon, label, href, c }) => (
                <a key={label} href={href} target={href === '/Archit_Sharma_CV.pdf' ? undefined : '_blank'} rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: '1px solid var(--line)', color: 'var(--soft)', textDecoration: 'none', transition: 'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = c; e.currentTarget.style.borderColor = c }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--soft)'; e.currentTarget.style.borderColor = 'var(--line)' }}
                >
                  <span style={{ color: c }}>❯</span><Icon size={14} />{label}<span style={{ marginLeft: 'auto' }}>▸</span>
                </a>
              ))}
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: 12, padding: '12px 14px' }}>
                <MapPin size={13} /> Darmstadt area, Germany
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="wrap" style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 36px' }}>
        <div aria-hidden="true" className="pixel" style={{
          fontSize: 'clamp(54px, 11vw, 128px)', lineHeight: 1, color: 'transparent', textAlign: 'center',
          WebkitTextStroke: '1px var(--line2)', userSelect: 'none', whiteSpace: 'nowrap',
        }}>
          KAI
        </div>
        <p className="mono" style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', margin: '14px 0 36px' }}>
          <span className="am">I build AI that shows its work.</span>
        </p>
        <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 11, color: 'var(--faint)', borderTop: '1px solid var(--line)', paddingTop: 20 }}>
          <span>© {new Date().getFullYear()} Archit "Kai" Sharma</span>
          <span style={{ display: 'flex', gap: 16 }}>
            <a href="/datenschutz.html" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Datenschutz</a>
          </span>
          <span><span className="cy">■</span> <span className="vi">■</span> <span className="am">■</span> built with React + Vite</span>
        </div>
      </footer>
    </section>
  )
}
