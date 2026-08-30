import React, { createContext, useContext, useState, useEffect } from 'react'
import * as api from '../api/mockApi'

const AuditContext = createContext(null)

export function AuditProvider({ children }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [overview, setOverview] = useState(null)
  const [records, setRecords] = useState([])
  const [auditChain, setAuditChain] = useState([])
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  // Verification state required by VerifyPage
  const [verifying, setVerifying] = useState(false)
  const [verifyProgress, setVerifyProgress] = useState([])
  const [verifyResult, setVerifyResult] = useState(null)

  const refreshData = async () => {
    try {
      const [ov, rec, chain, act] = await Promise.all([
        api.getOverview(),
        api.getRecords(),
        api.getAuditChain(),
        api.getActivity(),
      ])
      setOverview(ov)
      setRecords(rec)
      setAuditChain(chain)
      setActivity(act)
    } catch (err) {
      console.error('Failed to load audit state:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  const tampered = overview?.chainStatus === 'broken'

  const runVerification = async () => {
    setVerifying(true)
    setVerifyProgress([])
    setVerifyResult(null)

    try {
      const chain = await api.getAuditChain()
      for (let i = 0; i < chain.length; i++) {
        await new Promise((res) => setTimeout(res, 300))
        setVerifyProgress((prev) => [...prev, chain[i]])
      }

      setVerifyResult({
        ok: !tampered,
        title: tampered ? 'Integrity Check Failed' : 'All Entries Verified',
        summary: tampered ? 'Chain link broken at entry #47.' : 'Cryptographic hashes match across all blocks.',
        detail: 'SHA-256 validation complete.',
        expectedValue: '0x8f43a...',
        detectedValue: tampered ? '0xBAD00...' : '0x8f43a...',
      })
    } catch (e) {
      setVerifyResult({ ok: false, title: 'Error', summary: 'Failed to complete verification scan.' })
    } finally {
      setVerifying(false)
    }
  }

  const value = {
    api,
    tampered,
    activeTab,
    setActiveTab,
    overview,
    records,
    auditChain,
    activity,
    loading,
    refreshData,
    verifying,
    verifyProgress,
    verifyResult,
    runVerification,
  }

  return (
    <AuditContext.Provider value={value}>
      {children}
    </AuditContext.Provider>
  )
}

export function useAuditStore() {
  const context = useContext(AuditContext)
  if (!context) {
    return {
      api,
      tampered: false,
      activeTab: 'overview',
      setActiveTab: () => {},
      records: [],
      overview: null,
      auditChain: [],
      activity: [],
      loading: false,
      refreshData: () => {},
      verifying: false,
      verifyProgress: [],
      verifyResult: null,
      runVerification: () => {},
    }
  }
  return context
}

export function useAudit() {
  return useAuditStore()
}

export default useAuditStore
