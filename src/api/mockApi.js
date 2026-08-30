/**
 * Simulated API layer with fallback data
 */

const FALLBACK_RECORDS = [
  { id: 'STU-1024', name: 'Database Management Systems', grade: 'A', hashStatus: 'verified' },
  { id: 'STU-0912', name: 'Computer Networks', grade: 'A', hashStatus: 'verified' },
  { id: 'STU-0884', name: 'Operating Systems', grade: 'B', hashStatus: 'verified' },
  { id: 'STU-0741', name: 'Data Structures & Algorithms', grade: 'A', hashStatus: 'verified' },
  { id: 'STU-0650', name: 'Software Engineering', grade: 'A', hashStatus: 'verified' },
]

const FALLBACK_STATS = {
  totalRecords: 248,
  auditEvents: 1284,
  chainStatus: 'verified',
  lastVerificationLabel: 'Today, 10:42 AM',
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let tampered = false

export function isTampered() {
  return tampered
}

export async function getOverview() {
  await delay(100)
  return {
    ...FALLBACK_STATS,
    chainStatus: tampered ? 'broken' : 'verified',
  }
}

export async function getActivity() {
  await delay(100)
  const baseActivity = [
    { id: '1', title: 'Grade updated for student STU-1024', detail: 'DBMS · 81 → 88', actor: 'Prof. Mehta' },
    { id: '2', title: 'Attendance record created', detail: 'Mid-term session · CS-B Section', actor: 'Exam Cell' },
    { id: '3', title: 'Grade correction approved', detail: 'Review ticket REV-331 · STU-0912', actor: 'Dr. Kapoor' }
  ]
  if (!tampered) return baseActivity
  return [
    { id: 'tamper', title: 'UNAUTHORIZED DIRECT DB WRITE', detail: 'STU-1024 grade forced from A to F', actor: 'Unknown Direct Access' },
    ...baseActivity
  ]
}

export async function getRecords() {
  await delay(100)
  return FALLBACK_RECORDS.map((record) => {
    if (tampered && record.id === 'STU-1024') {
      return {
        ...record,
        grade: 'F',
        hashStatus: 'compromised',
      }
    }
    return { ...record }
  })
}

export async function getAuditChain() {
  await delay(100)
  return [
    { entryNumber: 1, recordId: 'STU-0650', hash: '8f9b2c...14a0', status: 'valid' },
    { entryNumber: 2, recordId: 'STU-0741', hash: '3e4a11...9b22', status: 'valid' },
    { entryNumber: 3, recordId: 'STU-0884', hash: '7c2d99...11aa', status: 'valid' },
    { entryNumber: 4, recordId: 'STU-0912', hash: '1a5b88...77ff', status: 'valid' },
    { entryNumber: 5, recordId: 'STU-1024', hash: tampered ? '????????' : '9d1c33...88bb', status: tampered ? 'compromised' : 'valid' },
  ]
}

export async function verifyIntegrity() {
  await delay(150)
  if (!tampered) {
    return {
      ok: true,
      title: 'Integrity Verified',
      detail: '1,284 entries checked. All cryptographic hashes match state history.',
    }
  }

  return {
    ok: false,
    title: 'Integrity Check Failed',
    detail: 'Mismatch at Entry #5 (Record STU-1024). Stored Hash does not match recomputed SHA-256 state.',
  }
}

export async function simulateDatabaseTampering() {
  await delay(150)
  tampered = true
  return { success: true }
}

export async function resetSimulation() {
  await delay(100)
  tampered = false
  return { success: true }
}
