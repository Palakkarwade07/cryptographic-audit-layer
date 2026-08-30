import { useEffect, useState } from 'react'
import { useAudit } from '../context/AuditStore'
import { RecordModal } from '../components/RecordModal'
import { formatDate, StatusBadge } from '../components/StatusBadge'

export function RecordsPage() {
  const { api, tampered } = useAudit()
  const [rows, setRows] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let live = true
    setLoading(true)
    api.getRecords()
      .then((data) => live && setRows(data))
      .catch(() => live && setError('Could not load exam records.'))
      .finally(() => live && setLoading(false))
    return () => { live = false }
  }, [api, tampered])

  if (loading) return <div className="card loading">Loading records…</div>
  if (error) return <div className="card error">{error}</div>

  return (
    <div>
      <div className="page-title">
        <div>
          <h3>Exam grade records</h3>
          <p className="lede">
            Current values as presented by the records service. Integrity reflects
            whether the value still matches its linked audit entry.
          </p>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="card empty">No records found.</div>
      ) : (
        <div className="card table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Last Modified</th>
                <th>Modified By</th>
                <th>Integrity</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={row.hashStatus === 'compromised' ? 'danger' : ''}
                  onClick={() => setSelected(row)}
                >
                  <td className="mono">{row.studentId}</td>
                  <td>{row.studentName}</td>
                  <td>{row.subject}</td>
                  <td><strong>{row.grade}</strong></td>
                  <td>{formatDate(row.lastModified)}</td>
                  <td>{row.modifiedBy}</td>
                  <td><StatusBadge status={row.hashStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <RecordModal record={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
