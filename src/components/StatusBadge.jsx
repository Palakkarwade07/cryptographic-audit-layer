import React from 'react'

export function formatDate(timestamp) {
  if (!timestamp) return 'N/A'
  try {
    const date = new Date(timestamp)
    return isNaN(date.getTime()) ? String(timestamp) : date.toLocaleString()
  } catch (e) {
    return String(timestamp)
  }
}

export function StatusBadge({ status }) {
  const isOk = status === 'valid' || status === 'ok' || status === 'verified'
  const isCompromised = status === 'compromised' || status === 'broken' || status === 'invalid'

  let bgColor = '#f1f5f9'
  let textColor = '#475569'
  let label = status ? String(status).toUpperCase() : 'UNKNOWN'

  if (isOk) {
    bgColor = '#dcfce7'
    textColor = '#15803d'
    label = 'VALID'
  } else if (isCompromised) {
    bgColor = '#fee2e2'
    textColor = '#991b1b'
    label = 'COMPROMISED'
  }

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '700',
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: 'monospace',
      }}
    >
      {label}
    </span>
  )
}

export default StatusBadge
