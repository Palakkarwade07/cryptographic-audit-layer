import React, { createContext, useContext, useState, useEffect } from 'react'
import * as api from '../api/mockApi'

const AuditContext = createContext()

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

  return (
    <AuditContext.Provider
      value={{
        activeTab,
        setActiveTab,
        overview,
        records,
        auditChain,
        activity,
        loading,
        refreshData,
      }}
    >
      {children}
    </AuditContext.Provider>
  )
}

// Export both names to satisfy all imports across pages
export function useAuditStore() {
  return useContext(AuditContext)
}

export function useAudit() {
  return useContext(AuditContext)
}
