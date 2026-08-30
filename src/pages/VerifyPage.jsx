import { useAudit } from '../context/AuditStore'
import { StatusBadge } from '../components/StatusBadge'

export function VerifyPage() {
  const { runVerification, verifying, verifyProgress, verifyResult, tampered } = useAudit()

  return (
    <div>
      <div className="page-title">
        <div>
          <h3>Verify integrity</h3>
          <p className="lede">
            Walks the audit trail and compares each stored previous-hash pointer.
            In production this will be performed by the backend using SHA-256.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => runVerification()} disabled={verifying}>
          {verifying ? 'Verifying…' : 'Verify Integrity'}
        </button>
      </div>

      {verifying && (
        <div className="card" style={{ padding: 18 }}>
          <strong>Checking audit entries…</strong>
          <div className="progress">
            {verifyProgress.map((step) => (
              <div className="progress-row" key={step.entryNumber}>
                <span>Entry #{step.entryNumber}</span>
                <StatusBadge status={step.status === 'valid' && tampered === false ? 'valid' : step.status} />
              </div>
            ))}
            {verifyProgress.length === 0 && <div className="loading">Starting scan…</div>}
          </div>
        </div>
      )}

      {!verifying && verifyResult && (
        <div className={`card result-card ${verifyResult.ok ? '' : ''}`}>
          <div className={`status-pill ${verifyResult.ok ? 'ok' : 'bad'}`} style={{ margin: '0 auto' }}>
            <span className="status-dot" />
            {verifyResult.ok ? 'PASS' : 'FAIL'}
          </div>
          <h3 style={{ color: verifyResult.ok ? 'var(--ok)' : 'var(--warn)' }}>
            {verifyResult.title}
          </h3>
          <p>{verifyResult.summary}</p>
          <p>{verifyResult.detail}</p>
          {!verifyResult.ok && (
            <p>
              Expected value: <strong>{verifyResult.expectedValue}</strong>
              {' · '}
              Detected value: <strong>{verifyResult.detectedValue}</strong>
            </p>
          )}
        </div>
      )}

      {!verifying && !verifyResult && (
        <div className="card empty">
          No scan has been run in this session. Click Verify Integrity to start.
        </div>
      )}
    </div>
  )
}
