/**
 * Simulated API layer.
 *
 * Swap these functions for fetch() calls later, e.g.:
 *   GET  /api/records
 *   GET  /api/audit-chain
 *   POST /api/verify
 *
 * This module holds in-memory demo state only. It does not
 * touch a real database or compute SHA-256.
 */

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
  await delay(160)
  return {
    ...SYSTEM_STATS,
    chainStatus: tampered ? 'broken' : 'verified',
    lastVerificationLabel: SYSTEM_STATS.lastVerificationLabel,
    simulation: true,
  }
}

export async function getActivity() {
  await delay(120)
  if (!tampered) return ACTIVITY
  return [
    {
      id: 'act-tamper',
      timestamp: new Date().toISOString(),
      actor: 'Unknown (direct DB write)',
      action: 'Out-of-band grade change detected on STU-1024',
      detail: `Expected ${TAMPER_TARGET.expectedGrade} · detected ${TAMPER_TARGET.tamperedGrade}`,
      status: 'compromised',
    },
    ...ACTIVITY,
  ]
}

export async function getRecords() {
  await delay(140)
  return RECORDS.map((record) => {
    if (tampered && record.id === TAMPER_TARGET.recordId) {
      return {
        ...record,
        grade: TAMPER_TARGET.tamperedGrade,
        hashStatus: 'compromised',
      }
    }
    return { ...record }
  })
}

export async function getAuditChain() {
  await delay(140)
  return AUDIT_CHAIN.map((entry) => {
    if (!tampered) return { ...entry }
    if (entry.entryNumber === TAMPER_TARGET.entryNumber) {
      return {
        ...entry,
        status: 'compromised',
        entryHash: '????????????????',
        detectedValue: TAMPER_TARGET.tamperedGrade,
      }
    }
    if (entry.entryNumber > TAMPER_TARGET.entryNumber) {
      return { ...entry, status: 'untrusted' }
    }
    return { ...entry }
  })
}

export async function verifyIntegrity() {
  await delay(80)
  const chain = AUDIT_CHAIN.map((entry) => {
    if (!tampered) return { ...entry, status: 'valid' }
    if (entry.entryNumber === TAMPER_TARGET.entryNumber) {
      return { ...entry, status: 'compromised' }
    }
    if (entry.entryNumber > TAMPER_TARGET.entryNumber) {
      return { ...entry, status: 'untrusted' }
    }
    return { ...entry, status: 'valid' }
  })

  if (!tampered) {
    return {
      ok: true,
      title: 'Integrity Verified',
      summary: `${SYSTEM_STATS.auditEvents.toLocaleString()} audit entries checked`,
      detail: 'No inconsistencies detected',
      checkedCount: SYSTEM_STATS.auditEvents,
      compromisedEntry: null,
      steps: chain,
    }
  }

  return {
    ok: false,
    title: 'Integrity Check Failed',
    summary: `Tampering detected at Entry #${TAMPER_TARGET.entryNumber}`,
    detail: `Expected value: ${TAMPER_TARGET.expectedGrade}  ·  Detected value: ${TAMPER_TARGET.tamperedGrade}`,
    checkedCount: SYSTEM_STATS.auditEvents,
    compromisedEntry: TAMPER_TARGET.entryNumber,
    expectedValue: TAMPER_TARGET.expectedGrade,
    detectedValue: TAMPER_TARGET.tamperedGrade,
    steps: chain,
  }
}

export async function simulateDatabaseTampering() {
  await delay(220)
  tampered = true
  return {
    simulation: true,
    recordId: TAMPER_TARGET.recordId,
    expectedGrade: TAMPER_TARGET.expectedGrade,
    detectedGrade: TAMPER_TARGET.tamperedGrade,
  }
}

export async function resetSimulation() {
  await delay(100)
  tampered = false
  return { simulation: true, reset: true }
}

export function getTamperTarget() {
  return { ...TAMPER_TARGET }
}
