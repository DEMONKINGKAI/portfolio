// README-style section title bar:  [02]  FEATURED WORK▮              ▣
export default function SectionTitle({ number, label, color = 'var(--cy)', sub }) {
  return (
    <div>
      <div className="sec-title" style={{ color }}>
        <span className="num">{number}</span>
        <h2 style={{ color }}>{label}</h2>
        <span className="sq hide-sm" />
        <span className="ticks" />
      </div>
      {sub && (
        <p className="mono" style={{ fontSize: 12.5, color: 'var(--muted)', margin: '-20px 0 32px' }}>
          <span style={{ color }}>// </span>{sub}
        </p>
      )}
    </div>
  )
}
