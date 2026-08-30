import React from 'react'
import { AuditProvider, useAuditStore } from './context/AuditStore'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import OverviewPage from './pages/OverviewPage'
import RecordsPage from './pages/RecordsPage'
import AuditChainPage from './pages/AuditChainPage'
import VerifyPage from './pages/VerifyPage'
import TamperDemoPage from './pages/TamperDemoPage'

function DashboardView() {
  const { activeTab } = useAuditStore()

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage />
      case 'records':
        return <RecordsPage />
      case 'chain':
        return <AuditChainPage />
      case 'verify':
        return <VerifyPage />
      case 'tamper':
        return <TamperDemoPage />
      default:
        return <OverviewPage />
    }
  }

  return (
    <div className="flex-1 min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="p-6 max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuditProvider>
      <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
        <Sidebar />
        <DashboardView />
      </div>
    </AuditProvider>
  )
}
