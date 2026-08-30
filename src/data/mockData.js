export const SYSTEM_STATS = {
  totalRecords: 248,
  auditEvents: 1284,
  chainStatus: 'verified',
  lastVerificationLabel: 'Just now (Automated node check)',
  activeNodes: 12,
  consensusRate: '100%',
  blockHeight: 1284,
  networkLatency: '14ms',
}

export const TAMPER_TARGET = {
  recordId: 'STU-1024',
  entryNumber: 5,
  studentName: 'Aarav Sharma',
  course: 'Database Management Systems',
  expectedGrade: '88 (Grade A)',
  tamperedGrade: '45 (Grade F)',
}

export const RECORDS = [
  { id: 'STU-1024', student: 'Aarav Sharma', course: 'Database Management Systems', code: 'CS-401', grade: '88', status: 'verified', updatedAt: '29 Aug, 10:18 am', verifiedBy: 'Prof. Mehta' },
  { id: 'STU-0912', student: 'Riya Patel', course: 'Computer Networks', code: 'CS-302', grade: '91', status: 'verified', updatedAt: '28 Aug, 02:22 pm', verifiedBy: 'Prof. Banerjee' },
  { id: 'STU-0884', student: 'Vikram Malhotra', course: 'Operating Systems', code: 'CS-301', grade: '79', status: 'verified', updatedAt: '27 Aug, 11:05 am', verifiedBy: 'Dr. Kapoor' },
  { id: 'STU-0741', student: 'Ananya Iyer', course: 'Data Structures & Algorithms', code: 'CS-201', grade: '95', status: 'verified', updatedAt: '26 Aug, 04:30 pm', verifiedBy: 'Prof. Sharma' },
  { id: 'STU-0650', student: 'Karan Joshi', course: 'Software Engineering', code: 'CS-405', grade: '84', status: 'verified', updatedAt: '25 Aug, 09:15 am', verifiedBy: 'Dr. Rao' },
  { id: 'STU-0512', student: 'Sneha Reddy', course: 'Artificial Intelligence', code: 'CS-501', grade: '92', status: 'verified', updatedAt: '24 Aug, 03:14 pm', verifiedBy: 'Dr. Kapoor' },
  { id: 'STU-0499', student: 'Rohan Gupta', course: 'Compiler Design', code: 'CS-402', grade: '87', status: 'verified', updatedAt: '24 Aug, 11:45 am', verifiedBy: 'Prof. Mehta' },
  { id: 'STU-0421', student: 'Pooja Verma', course: 'Theory of Computation', code: 'CS-304', grade: '76', status: 'verified', updatedAt: '23 Aug, 01:20 pm', verifiedBy: 'Prof. Sharma' },
  { id: 'STU-0388', student: 'Aditya Das', course: 'Computer Architecture', code: 'CS-202', grade: '89', status: 'verified', updatedAt: '22 Aug, 05:10 pm', verifiedBy: 'Dr. Rao' },
  { id: 'STU-0355', student: 'Meera Nair', course: 'Distributed Systems', code: 'CS-503', grade: '94', status: 'verified', updatedAt: '22 Aug, 10:00 am', verifiedBy: 'Prof. Banerjee' },
  { id: 'STU-0310', student: 'Siddharth Rao', course: 'Machine Learning', code: 'CS-502', grade: '90', status: 'verified', updatedAt: '21 Aug, 04:45 pm', verifiedBy: 'Dr. Kapoor' },
  { id: 'STU-0294', student: 'Tanya Singh', course: 'Cyber Security', code: 'CS-408', grade: '83', status: 'verified', updatedAt: '21 Aug, 02:15 pm', verifiedBy: 'Prof. Mehta' },
  { id: 'STU-0277', student: 'Varun Saxena', course: 'Cloud Computing', code: 'CS-410', grade: '88', status: 'verified', updatedAt: '20 Aug, 11:30 am', verifiedBy: 'Dr. Rao' },
  { id: 'STU-0240', student: 'Kavya Kulkarni', course: 'Big Data Analytics', code: 'CS-506', grade: '96', status: 'verified', updatedAt: '20 Aug, 09:10 am', verifiedBy: 'Prof. Sharma' },
  { id: 'STU-0219', student: 'Nikhil Bhat', course: 'Mobile Application Dev', code: 'CS-309', grade: '78', status: 'verified', updatedAt: '19 Aug, 03:55 pm', verifiedBy: 'Prof. Banerjee' },
  { id: 'STU-0185', student: 'Ishita Roy', course: 'Natural Language Proc', code: 'CS-508', grade: '93', status: 'verified', updatedAt: '19 Aug, 01:15 pm', verifiedBy: 'Dr. Kapoor' },
  { id: 'STU-0162', student: 'Gaurav Sen', course: 'Computer Graphics', code: 'CS-306', grade: '81', status: 'verified', updatedAt: '18 Aug, 12:40 pm', verifiedBy: 'Prof. Mehta' },
  { id: 'STU-0144', student: 'Divya Deshmukh', course: 'Digital Image Processing', code: 'CS-412', grade: '86', status: 'verified', updatedAt: '18 Aug, 10:25 am', verifiedBy: 'Dr. Rao' },
  { id: 'STU-0111', student: 'Abhinav Pandey', course: 'Embedded Systems', code: 'CS-311', grade: '74', status: 'verified', updatedAt: '17 Aug, 04:00 pm', verifiedBy: 'Prof. Sharma' },
  { id: 'STU-0095', student: 'Shruti Hegde', course: 'VLSI Design', code: 'EC-401', grade: '89', status: 'verified', updatedAt: '17 Aug, 02:30 pm', verifiedBy: 'Prof. Banerjee' },
]

export const AUDIT_CHAIN = [
  { entryNumber: 1, recordId: 'STU-0650', action: 'CREATE_RECORD', prevHash: '0000000000000000000000000000000000000000000000000000000000000000', entryHash: '8f9b2c4e1012a9bf928374102938475610293847561029384756102938475610', status: 'valid', timestamp: '25 Aug 09:15', nonce: 49210 },
  { entryNumber: 2, recordId: 'STU-0741', action: 'CREATE_RECORD', prevHash: '8f9b2c4e1012a9bf928374102938475610293847561029384756102938475610', entryHash: '3e4a11882c9b22e1903847102938475610293847561029384756102938475610', status: 'valid', timestamp: '26 Aug 16:30', nonce: 10482 },
  { entryNumber: 3, recordId: 'STU-0884', action: 'UPDATE_GRADE', prevHash: '3e4a11882c9b22e1903847102938475610293847561029384756102938475610', entryHash: '7c2d99aa3311aa88102938475610293847561029384756102938475610293847', status: 'valid', timestamp: '27 Aug 11:05', nonce: 88419 },
  { entryNumber: 4, recordId: 'STU-0912', action: 'UPDATE_GRADE', prevHash: '7c2d99aa3311aa88102938475610293847561029384756102938475610293847', entryHash: '1a5b88ff9077ff42102938475610293847561029384756102938475610293847', status: 'valid', timestamp: '28 Aug 14:22', nonce: 30129 },
  { entryNumber: 5, recordId: 'STU-1024', action: 'UPDATE_GRADE', prevHash: '1a5b88ff9077ff42102938475610293847561029384756102938475610293847', entryHash: '9d1c3377bb88bb10102938475610293847561029384756102938475610293847', status: 'valid', timestamp: '29 Aug 10:18', nonce: 77201 },
]

export const ACTIVITY = [
  { id: 'act-1', timestamp: '29 Aug, 10:18 am', action: 'Grade updated for student STU-1024', detail: 'Database Management Systems · 81 → 88 · Prof. Mehta', status: 'committed', actor: 'Prof. Mehta', ip: '192.168.1.104' },
  { id: 'act-2', timestamp: '29 Aug, 09:04 am', action: 'Attendance record created', detail: 'Mid-term session · CS-B Section · Exam Cell', status: 'committed', actor: 'Exam Cell', ip: '192.168.1.200' },
  { id: 'act-3', timestamp: '28 Aug, 04:41 pm', action: 'Grade correction approved', detail: 'Review ticket REV-331 · STU-0912 · Dr. Kapoor', status: 'committed', actor: 'Dr. Kapoor', ip: '192.168.1.112' },
  { id: 'act-4', timestamp: '28 Aug, 02:22 pm', action: 'Grade updated for student STU-0912', detail: 'Computer Networks · 89 → 91 · Prof. Banerjee', status: 'committed', actor: 'Prof. Banerjee', ip: '192.168.1.108' },
]
