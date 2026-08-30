import React, { useState } from 'react'
import { useAuditStore } from '../context/AuditStore'

export default function RecordsPage() {
  const { records } = useAuditStore()
  const [search, setSearch] = useState('')

  const filteredRecords = records.filter(
    (r) =>
      r.student.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.course.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
            Immutable Academic Ledger ({records.length} Records)
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0' }}>
            Cryptographically signed student performance data.
          </p>
        </div>
        <input
          type="text"
          placeholder="Filter by Student, ID, or Course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            width: '300px',
            fontSize: '14px',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#0f172a', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '14px 18px' }}>Record ID</th>
              <th style={{ padding: '14px 18px' }}>Student Name</th>
              <th style={{ padding: '14px 18px' }}>Course</th>
              <th style={{ padding: '14px 18px' }}>Grade</th>
              <th style={{ padding: '14px 18px' }}>Ledger Status</th>
              <th style={{ padding: '14px 18px' }}>Signed By</th>
              <th style={{ padding: '14px 18px' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((item, index) => {
              const isCompromised = item.status === 'compromised'
              return (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid #f1f5f9',
                    backgroundColor: isCompromised ? '#fef2f2' : index % 2 === 0 ? '#fff' : '#f8fafc',
                  }}
                >
                  <td style={{ padding: '14px 18px', fontWeight: 'bold', fontFamily: 'monospace', color: '#2563eb' }}>
                    {item.id}
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: '600', color: '#1e293b' }}>{item.student}</td>
                  <td style={{ padding: '14px 18px', color: '#475569' }}>
                    <span style={{ fontSize: '12px', backgroundColor: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', marginRight: '6px', fontFamily: 'monospace' }}>{item.code}</span>
                    {item.course}
                  </td>
                  <td style={{ padding: '14px 18px', fontWeight: 'bold', color: isCompromised ? '#ef4444' : '#0f172a' }}>
                    {item.grade}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        backgroundColor: isCompromised ? '#fee2e2' : '#dcfce7',
                        color: isCompromised ? '#991b1b' : '#166534',
                      }}
                    >
                      {isCompromised ? '● COMPROMISED' : '✓ SIGNED'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', color: '#64748b' }}>{item.verifiedBy}</td>
                  <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '13px' }}>{item.updatedAt}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
