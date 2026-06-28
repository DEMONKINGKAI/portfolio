export default function SectionEyebrow({ label, number }) {
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
        gap: 10,
      }}
    >
      {number && (
        <span style={{ color: 'var(--faint)', letterSpacing: '0.08em' }}>
          {number} —
        </span>
      )}
      <span style={{ fontSize: 8, lineHeight: 1 }}>●</span>
      {label}
    </p>
  )
}
