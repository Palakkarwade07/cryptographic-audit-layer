import { CloseIcon } from './Icons'
import { formatDate, StatusBadge } from './StatusBadge'

export function RecordModal({ record, onClose }) {
  if (!record) return null

  return (
    <div className="overlay" onClick={onClose} role="presentation">
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <strong>{record.studentName}</strong>
            <div className="subtitle">{record.studentId} · {record.subject}</div>
          </div>
          <button className="btn btn-ghost" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body">
          <div className="grid-2">
            <div className="kv">
              <div className="k">Current value</div>
              <div className="v grade-xl">{record.grade}</div>
            </div>
            <div className="kv">
              <div className="k">Previous value</div>
              <div className="v grade-xl" style={{ color: 'var(--muted)' }}>{record.previousGrade}</div>
            </div>
            <div className="kv">
              <div className="k">Actor</div>
              <div className="v">{record.modifiedBy}</div>
            </div>
            <div className="kv">
              <div className="k">Timestamp</div>
              <div className="v">{formatDate(record.lastModified)}</div>
            </div>
            <div className="kv">
              <div className="k">Audit entry ID</div>
              <div className="v mono">{record.auditEntryId}</div>
            </div>
            <div className="kv">
              <div className="k">Hash status</div>
              <div className="v"><StatusBadge status={record.hashStatus} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
