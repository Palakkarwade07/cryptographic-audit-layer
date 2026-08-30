import { useState } from 'react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { useAudit } from './context/AuditStore'
import { OverviewPage } from './pages/OverviewPage'
import { RecordsPage } from './pages/RecordsPage'
import { AuditChainPage } from './pages/AuditChainPage'
import { VerifyPage } from './pages/VerifyPage'
import { TamperDemoPage } from './pages/TamperDemoPage'

const PAGES = {
  overview: OverviewPage,
  records: RecordsPage,
  chain: AuditChainPage,
  verify: VerifyPage,
  tamper: TamperDemoPage,
}

export default function App() {
  const { page } = useAudit()
  const [menuOpen, setMenuOpen] = useState(false)
  const Page = PAGES[page] || OverviewPage

  return (
    <div className="app">
      <div className={`backdrop ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="main">
        <Header onMenu={() => setMenuOpen(true)} />
        <div className="content">
          <Page />
        </div>
      </div>
    </div>
  )
}
