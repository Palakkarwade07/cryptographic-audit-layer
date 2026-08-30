import { createContext, useContext, useMemo, useState } from 'react'
import * as api from '../api/mockApi'

const AuditContext = createContext(null)

export function AuditProvider({ children }) {
  const [page, setPage] = useState('overview')
  const [tampered, setTampered] = useState(false)
  const [verifyResult, setVerifyResult] = useState(null)
  const [verifying, setVerifying] = useState(false)
  const [verifyProgress, setVerifyProgress] = useState([])

  async function runVerification(options = {}) {
    const navigate = options.navigate !== false
    setVerifying(true)
    setVerifyResult(null)
    setVerifyProgress([])
    if (navigate) setPage('verify')

    const chain = await api.getAuditChain()
    for (const entry of chain) {
      await new Promise((r) => setTimeout(r, 180))
      setVerifyProgress((prev) => [
        ...prev,
        { entryNumber: entry.entryNumber, status: entry.status },
      ])
    }

    const result = await api.verifyIntegrity()
    setVerifyResult(result)
    setVerifying(false)
    return result
  }

  async function simulateTamper() {
    await api.simulateDatabaseTampering()
    setTampered(true)
    setVerifyResult(null)
    setVerifyProgress([])
  }

  async function resetSimulation() {
    await api.resetSimulation()
    setTampered(false)
    setVerifyResult(null)
    setVerifyProgress([])
  }

  const value = useMemo(
    () => ({
      page,
      setPage,
      tampered,
      verifyResult,
      verifying,
      verifyProgress,
      runVerification,
      simulateTamper,
      resetSimulation,
      api,
    }),
    [page, tampered, verifyResult, verifying, verifyProgress],
  )

  return <AuditContext.Provider value={value}>{children}</AuditContext.Provider>
}

export function useAudit() {
  const ctx = useContext(AuditContext)
  if (!ctx) throw new Error('useAudit must be used within AuditProvider')
  return ctx
}
