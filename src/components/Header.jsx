import { useAudit } from '../context/AuditStore'
import { MenuIcon } from './Icons'

export function Header({ onMenu }) {
  const { tampered } = useAudit()

  return (
    <header className="header">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button className="menu-btn" onClick={onMenu} aria-label="Open navigation">
          <MenuIcon />
        </button>
        <div>
          <h2>Exam Records Integrity System</h2>
          <p className="subtitle">Tamper-evident cryptographic audit trail</p>
        </div>
      </div>
      <div className={`status-pill ${tampered ? 'bad' : 'ok'}`}>
        <span className="status-dot" />
        {tampered ? 'Integrity Alert' : 'System Protected'}
      </div>
    </header>
  )
}
