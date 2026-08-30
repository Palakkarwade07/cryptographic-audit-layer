import React from 'react'
import { useAuditStore } from '../context/AuditStore'

export default function OverviewPage() {
  const { overview, records, setActiveTab } = useAuditStore()

  const isBroken = overview?.chainStatus === 'broken'

  return (
    <div style={{ maxWidth: '1100px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px' }}>
        Overview
      </h2>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* Clickable Total Records Card */}
        <div
          onClick={() => setActiveTab('records')}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#2563eb'
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.12)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0'
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)'
            e.currentTarget.style.transform = 'translateY(0px)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Records
            </span>
            <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '600' }}>
              View All →
            </span>
          </div>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', marginTop: '12px' }}>
            {records?.length || overview?.totalRecords || 20}
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', margin: 0 }}>
            Click to view full student details & grades
          </p>
        </div>

        {/* Chain Status Card */}
        <div
          onClick={() => setActiveTab('chain')}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = isBroken ? '#ef4444' : '#10b981'
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0'
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)'
            e.currentTarget.style.transform = 'translateY(0px)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Chain Status
            </span>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
              Audit Block #1284
            </span>
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: '800',
              color: isBroken ? '#ef4444' : '#10b981',
              marginTop: '12px',
              textTransform: 'uppercase',
            }}
          >
            {isBroken ? 'BROKEN' : 'VERIFIED'}
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', margin: 0 }}>
            {isBroken ? 'Cryptographic hash mismatch detected' : 'SHA-256 signatures validated'}
          </p>
        </div>
      </div>
    </div>
  )
}
