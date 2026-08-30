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
      if (onRefresh) await onRefresh()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    setLoading(true)
    try {
      await resetSimulation()
      setTamperState(false)
      if (onRefresh) await onRefresh()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Tamper Simulation Lab</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>
        Simulate an out-of-band database update to test cryptographic chain detection.
      </p>
      
      <div style={{ padding: '16px', borderRadius: '6px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', marginBottom: '20px' }}>
        <strong>Status: </strong> 
        <span style={{ color: tamperState ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
          {tamperState ? 'COMPROMISED (Tampered)' : 'SECURE (Verified)'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={handleSimulate}
          disabled={loading || tamperState}
          style={{
            padding: '10px 16px',
            backgroundColor: tamperState ? '#cbd5e1' : '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: tamperState ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {loading ? 'Processing...' : 'Simulate Database Tamper'}
        </button>

        <button
          onClick={handleReset}
          disabled={loading || !tamperState}
          style={{
            padding: '10px 16px',
            backgroundColor: !tamperState ? '#cbd5e1' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: !tamperState ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          Reset Simulation
        </button>
      </div>
    </div>
  )
}
