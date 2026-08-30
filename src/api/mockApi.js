import {
  ACTIVITY,
  AUDIT_CHAIN,
  RECORDS,
  SYSTEM_STATS,
  TAMPER_TARGET,
} from '../data/mockData'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let tampered = false

export function isTampered() {
  return tampered
}

export async function getOverview() {
  await delay(100)
  return {
    ...SYSTEM_STATS,
    chainStatus: tampered ? 'broken' : 'verified',
    activeNodes: tampered ? '11/12 (1 node compromised)' : '12/12 Online',
    consensusRate: tampered ? '83.3% (Mismatch)' : '100% Valid',
  }
}

export async function getActivity() {
  await delay(100)
  if (!tampered) return ACTIVITY || []
  return [
    {
      id: 'act-tamper',
      timestamp: new Date().toLocaleTimeString(),
      action: 'DIRECT DATABASE MUTATION DETECTED',
      detail: `STU-1024 grade forced to 45 (Grade F) · SHA-256 Hash Mismatch`,
      status: 'compromised',
      actor: 'UNAUTHORIZED_ACCESS',
      ip: '10.0.0.88 (Bypassed API Gateway)',
    },
    ...(ACTIVITY || []),
  ]
}

export async function getRecords() {
  await delay(100)
  if (!RECORDS) return []
  return RECORDS.map((record) => {
    if (tampered && record.id === TAMPER_TARGET.recordId) {
      return {
        ...record,
        grade: '45 (F)',
        status: 'compromised',
      }
    }
    return { ...record }
  })
}

export async function getAuditChain() {
  await delay(100)
  if (!AUDIT_CHAIN) return []
  return AUDIT_CHAIN.map((entry) => {
    if (!tampered) return { ...entry }
    if (entry.entryNumber === TAMPER_TARGET.entryNumber) {
      return {
        ...entry,
        status: 'compromised',
        entryHash: 'INVALID_HASH_CORRUPTED_BLOCK_0x9F8B',
      }
    }
    if (entry.entryNumber > TAMPER_TARGET.entryNumber) {
      return { ...entry, status: 'untrusted' }
    }
    return { ...entry }
  })
}

export async function verifyIntegrity() {
  await delay(200)
  if (!tampered) {
    return {
      ok: true,
      title: 'Cryptographic Proof Verified',
      detail: '1,284 blocks re-hashed against SHA-256 root. Zero tampering detected.',
    }
  }

  return {
    ok: false,
    title: 'Chain Integrity Violation Detected',
    detail: 'Block #5 (Record STU-1024) failed signature hash comparison. Stored state does not match cryptographic ledger.',
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
