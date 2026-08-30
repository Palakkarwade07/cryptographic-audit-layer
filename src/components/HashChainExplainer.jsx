export function HashChainExplainer() {
  return (
    <div className="card explainer">
      <div className="flow">
        <div className="flow-box">Entry #1</div>
        <div className="arrow">↓ hash</div>
        <div className="flow-box">Entry #2</div>
        <div className="arrow">↓ hash</div>
        <div className="flow-box">Entry #3</div>
        <div className="arrow">↓ hash</div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px' }}>How the audit chain works</h4>
        <p className="lede" style={{ margin: 0 }}>
          Each audit entry contains the hash of the previous entry. Changing an
          earlier entry changes its hash and breaks the link to the next entry.
          AuditGuard does not prevent every write to storage — it makes unauthorized
          historical changes detectable.
        </p>
      </div>
    </div>
  )
}
