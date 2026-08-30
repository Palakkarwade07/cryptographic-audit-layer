import { useEffect, useState } from 'react'
import { useAuditStore } from '../context/AuditStore'
import { formatDate, StatusBadge } from '../components/StatusBadge'

export function AuditChainPage() {
  const store = useAuditStore()
  const api = store.api || { getAuditChain: async () => store.auditChain || [] }
  const tampered = store.tampered || store.overview?.chainStatus === 'broken'

  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let live = true
    setLoading(true)
    api.getAuditChain()
      .then((data) => live && setEntries(data || []))
      .catch(() => live && setError('Could not load the audit chain.'))
      .finally(() => live && setLoading(false))
    return () => { live = false }
  }, [tampered])

  if (loading) return <div className="card loading">Loading audit chain…</div>
  if (error) return <div className="card error">{error}</div>

  return (
    <div>
      <div className="page-title">
        <div>
          <h3>Audit chain</h3>
          <p className="lede">
            Recent entries linked by previous-hash pointers. This view shows a
            window of the trail (entries #43–#50). A broken link means an earlier
            entry no longer produces the hash the next entry expects.
          </p>
        </div>
      </div>

      {tampered && (
        <div className="banner bad">
          <h4>Integrity violation detected</h4>
          <p>The connection after Entry #47 is broken. Subsequent entries cannot be trusted until the chain is restored from a known-good snapshot.</p>
        </div>
      )}

      {!tampered && (
        <div className="banner ok">
          <h4>Chain intact</h4>
          <p>Each displayed entry links to the previous hash. Status: VALID.</p>
        </div>
      )}

      {entries.length === 0 ? (
        <div className="card empty">No audit entries available.</div>
      ) : (
        <div className="chain">
          {entries.map((entry, index) => (
            <div className="chain-item" key={entry.id || index}>
              <article className={`node ${entry.status}`}>
                <div className="k">Entry #{String(entry.entryNumber || index + 1).padStart(2, '0')}</div>
                <h5>{entry.action}</h5>
                <div className="k">Record ID</div>
                <div className="mono" style={{ fontSize: 12, marginBottom: 8 }}>{entry.recordId}</div>
                <div className="k">Timestamp</div>
                <div style={{ marginBottom: 8 }}>{formatDate ? formatDate(entry.timestamp) : entry.timestamp}</div>
                <div className="k">Actor</div>
                <div style={{ marginBottom: 8 }}>{entry.actor}</div>
                <div className="k">Previous hash</div>
                <div className="hash mono">{entry.prevHash || entry.previousHash}</div>
                <div className="k" style={{ marginTop: 8 }}>Entry hash</div>
                <div className={`hash mono ${entry.status === 'compromised' ? 'broken' : ''}`}>
                  {entry.entryHash || entry.hash}
                </div>
                <div style={{ marginTop: 10 }}>
                  {StatusBadge ? <StatusBadge status={entry.status} /> : <span>{entry.status}</span>}
                </div>
              </article>
              {index < entries.length - 1 && (
                <div
                  className={`connector ${
                    entry.status === 'compromised' ? 'broken' : ''
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AuditChainPage
