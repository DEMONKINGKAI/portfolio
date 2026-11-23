// A lit segment that travels around the parent's border (README card effect).
// Parent needs position: relative. Colour/duration come from --rc / --rd.
export default function Runner() {
  return (
    <svg aria-hidden="true" className="runner-svg" width="100%" height="100%" preserveAspectRatio="none">
      <rect x="0.5" y="0.5" width="100%" height="100%" pathLength="100" />
    </svg>
  )
}
