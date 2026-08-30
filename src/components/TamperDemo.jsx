import React, { useState } from 'react'
import { simulateDatabaseTampering, resetSimulation, isTampered } from '../api/mockApi'

export default function TamperDemo({ onRefresh }) {
  const [loading, setLoading] = useState(false)
  const [tamperState, setTamperState] = useState(isTampered())

  const handleSimulate = async () => {
    setLoading(true)
    try {
      await simulateDatabaseTampering()
      setTamperState(true)
      if (onRefresh) onRefresh()
    } catch (err) {
      console.error('Tamper simulation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    setLoading(true)
    try {
      await resetSimulation()
      setTamperState(false)
      if (onRefresh) onRefresh()
    } catch (err) {
      console.error('Reset error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
        Tamper Simulation Lab
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        Simulate an out-of-band database update to break the cryptographic audit chain.
      </p>

      <div style={{ padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#fff' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
          Current State: {tamperState ? <span style={{ color: '#ef4444' }}>COMPROMISED</span> : <span style={{ color: '#10b981' }}>SECURE</span>}
        </h3>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button
            onClick={handleSimulate}
            disabled={loading || tamperState}
            style={{
              padding: '10px 16px',
              backgroundColor: tamperState ? '#9ca3af' : '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: tamperState ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            {loading ? 'Simulating...' : 'Simulate Database Tamper'}
          </button>

          <button
            onClick={handleReset}
            disabled={loading || !tamperState}
            style={{
              padding: '10px 16px',
              backgroundColor: !tamperState ? '#9ca3af' : '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: !tamperState ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            Reset Chain Integrity
          </button>
        </div>
      </div>
    </div>
  )
}
