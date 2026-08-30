import { useAudit } from '../context/AuditStore'
import {
  AlertIcon,
  LayoutIcon,
  LinkIcon,
  ScanIcon,
  ShieldIcon,
  TableIcon,
} from './Icons'

const ITEMS = [
  { id: 'overview', label: 'Overview', Icon: LayoutIcon },
  { id: 'records', label: 'Records', Icon: TableIcon },
  { id: 'chain', label: 'Audit Chain', Icon: LinkIcon },
  { id: 'verify', label: 'Verify Integrity', Icon: ScanIcon },
  { id: 'tamper', label: 'Tamper Demo', Icon: AlertIcon },
]

export function Sidebar({ open, onClose }) {
  const { page, setPage, tampered } = useAudit()

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand">
        <div className="brand-mark">
          <ShieldIcon size={20} />
        </div>
        <div>
          <h1>AuditGuard</h1>
          <p>Make every change provable.</p>
        </div>
      </div>

      <nav className="nav">
        {ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`nav-btn ${page === id ? 'active' : ''}`}
            onClick={() => {
              setPage(id)
              onClose()
            }}
          >
            <Icon />
            {label}
          </button>
        ))}
      </nav>

      <div className="sim-note">
        {tampered
          ? 'Simulation active: historical data was altered outside the application flow.'
          : 'Frontend simulation. No live database or cryptographic backend is connected.'}
      </div>
    </aside>
  )
}
