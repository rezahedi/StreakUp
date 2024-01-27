export default function VerticalEllipsis({className}: {className?: string}) {
  return (
    <div className={className}>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="1.5"></circle>
        <circle cx="12" cy="5" r="1.5"></circle>
        <circle cx="12" cy="19" r="1.5"></circle>
      </svg>
    </div>
  )
}
