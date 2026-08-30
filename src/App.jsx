import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { 
  getOverview, 
  getRecords, 
  getAuditChain, 
  getActivity, 
  verifyIntegrity, 
  simulateDatabaseTampering, 
  resetSimulation, 
  isTampered 
} from './api/mockApi'

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [overviewData, setOverviewData] = useState(null)
  const [records, setRecords] = useState([])
  const [auditChain, setAuditChain] = useState([])
  const [activity, setActivity] = useState([])
  const [verificationResult, setVerificationResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [tamperState, setTamperState] = useState(false)

  const loadData = async () => {
    try {
      const [ov, rec, chain, act] = await Promise.all([
        getOverview(),
        getRecords(),
        getAuditChain(),
        getActivity()
      ])
      setOverviewData(ov)
      setRecords(rec)
      setAuditChain(chain)
      setActivity(act)
      if (typeof isTampered === 'function') {
        setTamperState(isTampered())
      }
    } catch (err) {
      console.error('Data loading error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    setActionLoading(true)
    try {
      const res = await verifyIntegrity()
      setVerificationResult(res)
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  const handleSimulateTamper = async () => {
    setActionLoading(true)
    try {
      await simulateDatabaseTampering()
      await loadData()
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  const handleResetTamper = async () => {
    setActionLoading(true)
    try {
      await resetSimulation()
      await loadData()
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [activeTab])

  // Normalize current tab matching to prevent tab key mismatches
  const currentTab = (activeTab || '').toLowerCase().replace(/[^a-z]/g, '')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={{ flex: 1, padding: '32px' }}>
        <Header />
        
        {loading ? (
          <p style={{ marginTop: '20px', color: '#64748b' }}>Loading dashboard data...</p>
        ) : (
          <div style={{ marginTop: '24px' }}>

            {/* OVERVIEW / DASHBOARD VIEW */}
            {(currentTab === 'overview' || currentTab === 'dashboard' || currentTab === '') && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Overview</h2>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1 }}>
                    <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>TOTAL RECORDS</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px' }}>{records.length || 248}</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1 }}>
                    <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>CHAIN STATUS</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: overviewData?.chainStatus === 'broken' ? '#ef4444' : '#10b981' }}>
                      {overviewData?.chainStatus === 'broken' ? 'BROKEN' : 'VERIFIED'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RECORDS VIEW */}
            {currentTab === 'records' && (
              <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Database Records</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {records.map((r, idx) => (
                    <li key={idx} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>{r.id || `STU-10${idx}`}</strong> — {r.name || 'Student Record'}</span>
                      <span style={{ color: r.hashStatus === 'compromised' ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
                        Grade: {r.grade || 'A'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* AUDIT CHAIN VIEW */}
            {(currentTab === 'auditchain' || currentTab === 'chain') && (
              <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Cryptographic Audit Chain</h2>
                <p style={{ color: '#64748b' }}>Immutable block linkage using SHA-256 hashes.</p>
              </div>
            )}

            {/* VERIFY INTEGRITY VIEW */}
            {currentTab === 'verifyintegrity' || currentTab === 'verify' ? (
              <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Integrity Verification</h2>
                <p style={{ color: '#64748b', marginBottom: '16px' }}>Run dynamic hashing to check audit chain sequence state.</p>
                <button 
                  onClick={handleVerify}
                  disabled={actionLoading}
                  style={{ padding: '10px 18px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                >
                  {actionLoading ? 'Verifying...' : 'Run Integrity Check'}
                </button>
                {verificationResult && (
                  <div style={{ marginTop: '20px', padding: '16px', backgroundColor: verificationResult.ok ? '#ecfdf5' : '#fef2f2', border: `1px solid ${verificationResult.ok ? '#a7f3d0' : '#fecaca'}`, borderRadius: '6px' }}>
                    <h3 style={{ color: verificationResult.ok ? '#065f46' : '#991b1b', margin: 0 }}>{verificationResult.title}</h3>
                    <p style={{ color: verificationResult.ok ? '#047857' : '#b91c1c', marginTop: '8px' }}>{verificationResult.detail}</p>
                  </div>
                )}
              </div>
            ) : null}

            {/* TAMPER DEMO VIEW */}
            {currentTab.includes('tamper') && (
              <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Tamper Simulation Lab</h2>
                <p style={{ color: '#64748b', marginBottom: '20px' }}>
                  Simulate an out-of-band direct database mutation to verify breakages across the hashing chain.
                </p>

                <div style={{ padding: '16px', borderRadius: '6px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', marginBottom: '24px' }}>
                  <span style={{ fontWeight: '600', color: '#334155' }}>Chain Integrity Status: </span>
                  <span style={{ color: overviewData?.chainStatus === 'broken' ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
                    {overviewData?.chainStatus === 'broken' ? 'COMPROMISED (Tampered)' : 'SECURE (Verified)'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleSimulateTamper}
                    disabled={actionLoading || overviewData?.chainStatus === 'broken'}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: overviewData?.chainStatus === 'broken' ? '#cbd5e1' : '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: overviewData?.chainStatus === 'broken' ? 'not-allowed' : 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    {actionLoading ? 'Processing...' : 'Simulate Database Tamper'}
                  </button>

                  <button
                    onClick={handleResetTamper}
                    disabled={actionLoading || overviewData?.chainStatus !== 'broken'}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: overviewData?.chainStatus !== 'broken' ? '#cbd5e1' : '#2563eb',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: overviewData?.chainStatus !== 'broken' ? 'not-allowed' : 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    {actionLoading ? 'Resetting...' : 'Reset Simulation'}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}
