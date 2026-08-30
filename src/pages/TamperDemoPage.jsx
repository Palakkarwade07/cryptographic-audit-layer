import React, { useState } from 'react'
import { useAuditStore } from '../context/AuditStore'
import { simulateDatabaseTampering, resetSimulation, isTampered } from '../api/mockApi'

export default function TamperDemoPage() {
  const { records, refreshData, overview } = useAuditStore()
  const [loading, setLoading] = useState(false)
  const isCompromised = overview?.chainStatus === 'broken' || isTampered()

  const handleSimulate = async () => {
    setLoading(true)
    await simulateDatabaseTampering()
    await refreshData()
    setLoading(false)
  }

  const handleReset = async () => {
    setLoading(true)
    await resetSimulation()
    await refreshData()
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Simulation Controller Panel */}
      <div
        style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '28px',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)',
          border: '1px solid #1e293b',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#f8fafc' }}>
              Cryptographic Tamper Lab
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0' }}>
              Simulate direct database mutations to test dynamic hash chain verification algorithms.
            </p>
          </div>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.05em',
              backgroundColor: isCompromised ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              color: isCompromised ? '#fca5a5' : '#6ee7b7',
              border: `1px solid ${isCompromised ? '#ef4444' : '#10b981'}`,
            }}
          >
            {isCompromised ? '● HASH MISMATCH DETECTED' : '● ALL HASHS VALIDATED'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button
            onClick={handleSimulate}
            disabled={loading || isCompromised}
            style={{
              padding: '10px 20px',
              backgroundColor: isCompromised ? '#334155' : '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: isCompromised ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Processing...' : 'Simulate Database Tamper (STU-1024)'}
          </button>
          <button
            onClick={handleReset}
            disabled={loading || !isCompromised}
            style={{
              padding: '10px 20px',
              backgroundColor: !isCompromised ? '#334155' : '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: !isCompromised ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Processing...' : 'Restore Ledger Integrity'}
          </button>
        </div>
      </div>

      {/* Detailed Records List View */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
          Database Records Sync Panel ({records.length} Active Node Entries)
        </h3>
        <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'monospace' }}>
          Consensus Model: SHA-256 Merkle Chain
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {records.map((item) => {
          const isTargetCompromised = item.status === 'compromised'
          
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: isTargetCompromised ? '#fff5f5' : '#ffffff',
                border: `1px solid ${isTargetCompromised ? '#fca5a5' : '#e2e8f0'}`,
                borderRadius: '8px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                transition: 'border 0.2s ease',
              }}
            >
              {/* Left Column: ID and Student Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1.2' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: '700',
                    fontSize: '14px',
                    color: isTargetCompromised ? '#991b1b' : '#2563eb',
                    backgroundColor: isTargetCompromised ? '#fee2e2' : '#eff6ff',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: `1px solid ${isTargetCompromised ? '#fecaca' : '#dbeafe'}`,
                  }}
                >
                  {item.id}
                </span>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: '#0f172a' }}>
                    {item.student || 'Aarav Sharma'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Roll No: <span style={{ fontFamily: 'monospace' }}>2024-{item.id.replace('STU-', '')}</span> · Dept of Computer Engineering
                  </div>
                </div>
              </div>

              {/* Middle Column: Course & Instructor */}
              <div style={{ flex: '1.5' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', marginRight: '8px', fontFamily: 'monospace' }}>
                    {item.code || 'CS-401'}
                  </span>
                  {item.course || 'Database Management Systems'}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  Faculty Evaluator: {item.verifiedBy || 'Prof. Mehta'} · Term: Fall 2026
                </div>
              </div>

              {/* Timestamp */}
              <div style={{ flex: '0.9', fontSize: '12px', color: '#64748b' }}>
                <div>Last Signed:</div>
                <div style={{ fontWeight: '500', color: '#334155' }}>{item.updatedAt || '29 Aug, 10:18 am'}</div>
              </div>

              {/* Right Column: Grade and Integrity Status Badge */}
              <div style={{ textAlign: 'right', flex: '0.8' }}>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '800',
                    color: isTargetCompromised ? '#dc2626' : '#16a34a',
                  }}
                >
                  Grade: {item.grade}
                </div>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '4px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '700',
                    backgroundColor: isTargetCompromised ? '#fee2e2' : '#dcfce7',
                    color: isTargetCompromised ? '#991b1b' : '#15803d',
                  }}
                >
                  {isTargetCompromised ? '✖ INVALID CHECKSUM' : '✓ SIGNED & VERIFIED'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
