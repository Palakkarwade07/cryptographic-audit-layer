import { useEffect, useState } from 'react'
import { useAudit } from '../context/AuditStore'
import { StatusBadge } from '../components/StatusBadge'

export function TamperDemoPage() {
  const {
    api,
    tampered,
    simulateTamper,
    runVerification,
    resetSimulation,
    verifying,
    verifyResult,
    verifyProgress,
    setPage,
  } = useAudit()
  const target = api.getTamperTarget()
  const [record, setRecord] = useState(null)
  const [chain, setChain] = useState([])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let live = true
    Promise.all([api.getRecords(), api.getAuditChain()]).then(([rows, entries]) => {
      if (!live) return
      setRecord(rows.find((r) => r.id === target.recordId) || null)
      setChain(entries)
    })
    return () => { live = false }
  }, [api, tampered, target.recordId])

  const grade = record?.grade ?? target.expectedGrade

  async function onTamper() {
    setBusy(true)
    await simulateTamper()
    setBusy(false)
  }

  return (
    <div>
      <div className="page-title">
        <div>
          <h3>Tamper demo</h3>
          <p className="lede">
            This simulation demonstrates what happens when historical data is
            modified outside the normal application flow.
          </p>
        </div>
        {tampered && (
          <button className="btn btn-ghost" onClick={resetSimulation}>Reset simulation</button>
        )}
      </div>

      <div className="banner" style={{ background: '#eef3f8', borderColor: 'var(--line)', color: 'var(--ink)' }}>
        <h4>Simulation only</h4>
        <p>
          This control does not write to a real database. It changes in-memory demo
          state so judges can see how a broken hash chain would be reported.
        </p>
      </div>

      <div className="card record-panel">
        <div>
          <div className="k" style={{ color: 'var(--muted)', fontSize: 12 }}>Student</div>
          <div className="v" style={{ fontWeight: 650, fontSize: 20 }}>Aditi Sharma</div>
          <div style={{ marginTop: 12, color: 'var(--muted)' }}>STU-1024 · REC-8841</div>
          <div style={{ marginTop: 16 }}>
            <div className="k" style={{ color: 'var(--muted)', fontSize: 12 }}>Subject</div>
            <div className="v" style={{ fontWeight: 600 }}>Database Management Systems</div>
          </div>
        </div>
        <div>
          <div className="grid-2">
            <div className="kv">
              <div className="k">Original grade</div>
              <div className="v grade-xl">88</div>
            </div>
            <div className="kv">
              <div className="k">Current grade</div>
              <div className="v grade-xl" style={{ color: tampered ? 'var(--warn)' : 'var(--ink)' }}>
                {grade}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 16 }} />

      {!tampered ? (
        <button className="btn btn-danger" onClick={onTamper} disabled={busy}>
          {busy ? 'Writing…' : 'Simulate Database Tampering'}
        </button>
      ) : (
        <div>
          <div className="banner bad">
            <h4>TAMPERING DETECTED</h4>
            <p>
              The record value no longer matches its stored cryptographic hash.
              Grade changed from {target.expectedGrade} to {target.tamperedGrade} without an audit entry.
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => runVerification({ navigate: false })}
            disabled={verifying}
          >
            {verifying ? 'Verifying…' : 'Verify Again'}
          </button>
          <button className="btn btn-ghost" style={{ marginLeft: 8 }} onClick={() => setPage('chain')}>
            View audit chain
          </button>
        </div>
      )}

      {tampered && (
        <div style={{ marginTop: 18 }}>
          <div className="section-head">
            <h4>Chain around Entry #47</h4>
            <span>Broken link after the compromised entry</span>
          </div>
          <div className="chain">
            {chain.filter((e) => e.entryNumber >= 46 && e.entryNumber <= 48).map((entry, index, list) => (
              <div className="chain-item" key={entry.id}>
                <article className={`node ${entry.status}`}>
                  <div className="k">Entry #{entry.entryNumber}</div>
                  <h5>{entry.action}</h5>
                  <div className={`hash mono ${entry.status === 'compromised' ? 'broken' : ''}`}>
                    {entry.entryHash}
                  </div>
                  <div style={{ marginTop: 10 }}><StatusBadge status={entry.status} /></div>
                </article>
                {index < list.length - 1 && (
                  <div className={`connector ${entry.status === 'compromised' ? 'broken' : ''}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {verifying && (
        <div className="card" style={{ padding: 18, marginTop: 12 }}>
          <strong>Re-checking audit entries…</strong>
          <div className="progress">
            {verifyProgress.map((step) => (
              <div className="progress-row" key={step.entryNumber}>
                <span>Entry #{step.entryNumber}</span>
                <StatusBadge status={step.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {!verifying && verifyResult && tampered && (
        <div className="card result-card" style={{ marginTop: 12 }}>
          <div className="status-pill bad" style={{ margin: '0 auto' }}>
            <span className="status-dot" />
            FAIL
          </div>
          <h3 style={{ color: 'var(--warn)' }}>Integrity Check Failed</h3>
          <p>Tampering detected at Entry #{target.entryNumber}</p>
          <p>Expected value: {target.expectedGrade}</p>
          <p>Detected value: {target.tamperedGrade}</p>
        </div>
      )}
    </div>
  )
}
