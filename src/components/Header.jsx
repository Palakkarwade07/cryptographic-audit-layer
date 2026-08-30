import React from 'react'

export default function Header() {
  return (
    <header style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
        Exam Records Integrity System
      </h1>
      <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', margin: 0 }}>
        Tamper-evident cryptographic audit trail
      </p>
    </header>
  )
}
