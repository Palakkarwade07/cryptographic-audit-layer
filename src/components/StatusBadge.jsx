export function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function StatusBadge({ status }) {
  const label = {
    valid: 'Valid',
    verified: 'Verified',
    committed: 'Committed',
    compromised: 'Compromised',
    untrusted: 'Untrusted',
  }[status] || status

  return <span className={`badge ${status}`}>{label}</span>
}
