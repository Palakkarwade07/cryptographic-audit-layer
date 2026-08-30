export const SYSTEM_STATS = {
  totalRecords: 248,
  auditEvents: 1284,
  chainStatus: 'verified',
  lastVerificationLabel: 'Today, 10:42 AM',
}

export const TAMPER_TARGET = {
  recordId: 'STU-1024',
  entryNumber: 5,
  studentName: 'Aarav Sharma',
  course: 'Database Management Systems',
  expectedGrade: '81 → 88 (Grade A)',
  tamperedGrade: '45 (Grade F)',
}

export const RECORDS = [
  { id: 'STU-1024', student: 'Aarav Sharma', course: 'DBMS', grade: '88', status: 'verified', updatedAt: '29 Aug, 10:18 am' },
  { id: 'STU-0912', student: 'Riya Patel', course: 'Computer Networks', grade: '91', status: 'verified', updatedAt: '28 Aug, 02:22 pm' },
  { id: 'STU-0884', student: 'Vikram Malhotra', course: 'Operating Systems', grade: '79', status: 'verified', updatedAt: '27 Aug, 11:05 am' },
  { id: 'STU-0741', student: 'Ananya Iyer', course: 'Data Structures', grade: '95', status: 'verified', updatedAt: '26 Aug, 04:30 pm' },
  { id: 'STU-0650', student: 'Karan Joshi', course: 'Software Eng.', grade: '84', status: 'verified', updatedAt: '25 Aug, 09:15 am' },
]

export const AUDIT_CHAIN = [
  { entryNumber: 1, recordId: 'STU-0650', action: 'CREATE_RECORD', prevHash: '0000000000000000', entryHash: '8f9b2c4e1012a9bf', status: 'valid', timestamp: '25 Aug 09:15' },
  { entryNumber: 2, recordId: 'STU-0741', action: 'CREATE_RECORD', prevHash: '8f9b2c4e1012a9bf', entryHash: '3e4a11882c9b22e1', status: 'valid', timestamp: '26 Aug 16:30' },
  { entryNumber: 3, recordId: 'STU-0884', action: 'UPDATE_GRADE', prevHash: '3e4a11882c9b22e1', entryHash: '7c2d99aa3311aa88', status: 'valid', timestamp: '27 Aug 11:05' },
  { entryNumber: 4, recordId: 'STU-0912', action: 'UPDATE_GRADE', prevHash: '7c2d99aa3311aa88', entryHash: '1a5b88ff9077ff42', status: 'valid', timestamp: '28 Aug 14:22' },
  { entryNumber: 5, recordId: 'STU-1024', action: 'UPDATE_GRADE', prevHash: '1a5b88ff9077ff42', entryHash: '9d1c3377bb88bb10', status: 'valid', timestamp: '29 Aug 10:18' },
]

export const ACTIVITY = [
  { id: 'act-1', timestamp: '29 Aug, 10:18 am', action: 'Grade updated for student STU-1024', detail: 'Database Management Systems · 81 → 88 · Prof. Mehta', status: 'committed', actor: 'Prof. Mehta' },
  { id: 'act-2', timestamp: '29 Aug, 09:04 am', action: 'Attendance record created', detail: 'Mid-term session · CS-B Section · Exam Cell', status: 'committed', actor: 'Exam Cell' },
  { id: 'act-3', timestamp: '28 Aug, 04:41 pm', action: 'Grade correction approved', detail: 'Review ticket REV-331 · STU-0912 · Dr. Kapoor', status: 'committed', actor: 'Dr. Kapoor' },
  { id: 'act-4', timestamp: '28 Aug, 02:22 pm', action: 'Grade updated for student STU-0912', detail: 'Computer Networks · 89 → 91 · Prof. Banerjee', status: 'committed', actor: 'Prof. Banerjee' },
]
