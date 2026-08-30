import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import TamperDemo from './components/TamperDemo'
import { getOverview, getRecords, getAuditChain, getActivity, verifyIntegrity } from './api/mockApi'

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [overviewData, setOverviewData] = useState(null)
  const [records, setRecords] = useState([])
  const [auditChain, setAuditChain] = useState([])
  const [activity, setActivity] = useState([])
  const [verificationResult, setVerificationResult] = useState(null)
  const [loading, setLoading] = useState(true)

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
    } catch (err) {
      console.error('Data loading error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    const res = await verifyIntegrity()
    setVerificationResult(res)
  }

  useEffect(() => {
    loadData()
  }, [activeTab])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={{ flex: 1, padding: '32px' }}>
        <Header />
        
        {loading ? (
          <p>Loading system state...</p>
        ) : (
          <>
            {(activeTab === 'overview' || activeTab === 'dashboard') && (
              <div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1 }}>
                    <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>TOTAL RECORDS</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{records.length || 248}</div>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1 }}>
                    <div style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold' }}>CHAIN STATUS</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: overviewData?.chainStatus === 'broken' ? '#ef4444' : '#10b981' }}>
                      {overviewData?.chainStatus === 'broken' ? 'BROKEN' : 'VERIFIED'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'tamper' || activeTab === 'tamper-demo' || activeTab === 'Tamper Demo') && (
              <TamperDemo onRefresh={loadData} />
            )}

            {activeTab === 'verify' && (
              <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h2>Integrity Verification</h2>
                <button 
                  onClick={handleVerify}
                  style={{ padding: '10px 16px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '12px' }}
                >
                  Run Verification
                </button>
                {verificationResult && (
                  <div style={{ marginTop: '16px', padding: '12px', backgroundColor: verificationResult.ok ? '#ecfdf5' : '#fef2f2', borderRadius: '6px' }}>
                    <strong>{verificationResult.title}</strong>
                    <p>{verificationResult.detail}</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
