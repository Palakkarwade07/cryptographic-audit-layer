import React from 'react'
import { useAuditStore } from '../context/AuditStore'

export default function OverviewPage() {
  const { overview, records, setActiveTab } = useAuditStore()
  const isBroken = overview?.chainStatus === 'broken'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
        Overview
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Total Records Card */}
        <div 
          onClick={() => setActiveTab('records')}
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>
            <span>Total Records</span>
            <span style={{ color: '#2563eb' }}>View All →</span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', marginTop: '16px' }}>
            {records?.length || overview?.totalRecords || 20}
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', marginBottom: 0 }}>
            Click to open detailed records table
          </p>
        </div>

        {/* Chain Status Card */}
        <div 
          onClick={() => setActiveTab('chain')}
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>
            <span>Chain Status</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: isBroken ? '#dc2626' : '#16a34a', marginTop: '16px', textTransform: 'uppercase' }}>
            {isBroken ? 'BROKEN' : 'VERIFIED'}
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', marginBottom: 0 }}>
            {isBroken ? 'Tamper signature mismatch detected' : ' cryptographic blocks validated'}
          </p>
        </div>
      </div>
    </div>
  )
}
