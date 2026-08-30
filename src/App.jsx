import React from 'react'
import { AuditProvider, useAuditStore } from './context/AuditStore'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import OverviewPage from './pages/OverviewPage'
import RecordsPage from './pages/RecordsPage'
import { AuditChainPage } from './pages/AuditChainPage'
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
    <div style={{ flex: 1, minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <Header />
      <main style={{ padding: '24px', maxWidth: '1280px', margin: '0 auto' }}>
        {renderContent()}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuditProvider>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: 'sans-serif' }}>
        <Sidebar />
        <DashboardView />
      </div>
    </AuditProvider>
  )
}
