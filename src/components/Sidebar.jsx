import React from 'react'

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: '⊞' },
    { id: 'records', label: 'Records', icon: '⊟' },
    { id: 'chain', label: 'Audit Chain', icon: '∞' },
    { id: 'verify', label: 'Verify Integrity', icon: '⇄' },
    { id: 'tamper', label: 'Tamper Demo', icon: '⚠' },
  ]

  return (
    <div style={{ width: '240px', backgroundColor: '#0f172a', color: '#fff', padding: '24px 16px', minHeight: '100vh' }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🛡</span> AuditGuard
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: isActive ? '#1e293b' : 'transparent',
                color: isActive ? '#60a5fa' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: isActive ? '600' : 'normal',
                width: '100%',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
