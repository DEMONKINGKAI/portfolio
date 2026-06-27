export default function SectionEyebrow({ label }) {
  return (
    <p
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: 'var(--accent)',
        letterSpacing: '0.1em',
        textTransform: 'lowercase',
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 7,
      }}
    >
      <span style={{ fontSize: 8, lineHeight: 1 }}>●</span>
      {label}
    </p>
  )
}
