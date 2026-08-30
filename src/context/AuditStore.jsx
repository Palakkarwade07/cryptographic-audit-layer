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
    }
  }
  return context
}

export function useAudit() {
  return useAuditStore()
}

export default useAuditStore
