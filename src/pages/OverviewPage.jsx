import { useEffect, useState } from 'react'
import { useAudit } from '../context/AuditStore'
import { HashChainExplainer } from '../components/HashChainExplainer'
import { formatDate, StatusBadge } from '../components/StatusBadge'

export function OverviewPage() {
  const { api, runVerification, tampered } = useAudit()
  const [stats, setStats] = useState(null)
  const [activity, setActivity] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let live = true
    setLoading(true)
    Promise.all([api.getOverview(), api.getActivity()])
      .then(([s, a]) => {
        if (!live) return
        setStats(s)
        setActivity(a)
      })
      .catch(() => live && setError('Could not load overview data.'))
      .finally(() => live && setLoading(false))
    return () => { live = false }
  }, [api, tampered])

  if (loading) return <div className="card loading">Loading dashboard…</div>
  if (error) return <div className="card error">{error}</div>

  return (
    <div>
      <div className="page-title">
        <div>
          <h3>Overview</h3>
          <p className="lede">
            AuditGuard creates a cryptographically linked history of record changes.
            Any retroactive modification breaks the chain and can be detected.
          </p>
        </div>
      </div>

      <div className="stats">
        <div className="card stat">
          <div className="label">Total Records</div>
          <div className="value">{stats.totalRecords.toLocaleString()}</div>
        </div>
        <div className="card stat">
          <div className="label">Audit Events</div>
          <div className="value">{stats.auditEvents.toLocaleString()}</div>
        </div>
        <div className="card stat">
          <div className="label">Chain Status</div>
          <div className="value" style={{ color: tampered ? 'var(--warn)' : 'var(--ok)', fontSize: 22 }}>
            {tampered ? 'BROKEN' : 'VERIFIED'}
          </div>
        </div>
        <div className="card stat">
          <div className="label">Last Verification</div>
          <div className="value" style={{ fontSize: 20 }}>{stats.lastVerificationLabel}</div>
        </div>
      </div>

      <div className="card callout">
        <p>
          Run a full integrity check against the stored audit trail. This demo
          simulates verification; the production system will recompute hashes server-side.
        </p>
        <button className="btn btn-primary" onClick={() => runVerification()}>Verify Integrity</button>
      </div>

      <div className="section-head">
        <h4>Recent activity</h4>
        <span>Live feed · mock data</span>
      </div>
      <div className="card activity">
        {activity.length === 0 && <div className="empty">No recent activity.</div>}
        {activity.map((item) => (
          <div className="activity-row" key={item.id}>
            <div className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
              {formatDate(item.timestamp)}
            </div>
            <div>
              <div className="action">{item.action}</div>
              <div className="meta">{item.detail} · {item.actor}</div>
            </div>
            <div>{item.actor}</div>
            <div><StatusBadge status={item.status} /></div>
          </div>
        ))}
      </div>

      <div style={{ height: 18 }} />
      <HashChainExplainer />
    </div>
  )
}
