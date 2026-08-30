// server.js
const crypto = require('crypto');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
  process.exit(-1);
});

// Global Middlewares
app.use(cors());
app.use(express.json());

// Helper for Payload Validation
const validatePayload = (body) => {
  const required = ['student_id', 'student_name', 'subject', 'grade', 'teacher_id'];
  return required.filter((field) => body[field] === undefined || body[field] === null || body[field] === '');
};

// Helper function to calculate SHA-256 hash of a record
function generateHash(data, previousHash, timestamp) {
  const content = JSON.stringify(data) + previousHash + timestamp;
  return crypto.createHash('sha256').update(content).digest('hex');
}


// --- REST API ROUTES ---

// POST /api/records - Create a new exam record
app.post('/api/records', async (req, res) => {
  try {
    const { action, user_id, details } = req.body;
    const timestamp = new Date().toISOString();

    // 1. Fetch the latest record from DB to get its hash
    const lastRecordResult = await pool.query(
      'SELECT hash FROM records ORDER BY id DESC LIMIT 1'
    );

    // 2. Set previous_hash (Genesis hash "0000..." if this is the first record)
    const previousHash = lastRecordResult.rows.length > 0 
      ? lastRecordResult.rows[0].hash 
      : '0000000000000000000000000000000000000000000000000000000000000000';

    // 3. Calculate current record's hash
    const recordPayload = { action, user_id, details };
    const currentHash = generateHash(recordPayload, previousHash, timestamp);

    // 4. Save record with cryptographic hashes
    const newRecord = await pool.query(
      `INSERT INTO records (action, user_id, details, timestamp, previous_hash, hash) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [action, user_id, details, timestamp, previousHash, currentHash]
    );

    res.status(201).json({
      success: true,
      data: newRecord.rows[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//GET /api/records/verify - Verify the integrity of the records chain
app.get('/api/records/verify', async (req, res) => {
  try {
    const { rows: records } = await pool.query('SELECT * FROM records ORDER BY id ASC');

    for (let i = 0; i < records.length; i++) {
      const current = records[i];
      const prevHash = i === 0 
        ? '0000000000000000000000000000000000000000000000000000000000000000' 
        : records[i - 1].hash;

      // 1. Verify previous hash pointer matches
      if (current.previous_hash !== prevHash) {
        return res.json({
          status: 'TAMPERED',
          message: `Broken chain detected at Record ID ${current.id}`,
          recordId: current.id
        });
      }

      // 2. Re-compute hash to verify data hasn't been altered directly in DB
      const recordPayload = { 
        action: current.action, 
        user_id: current.user_id, 
        details: current.details 
      };
      const recomputedHash = generateHash(recordPayload, current.previous_hash, current.timestamp);

      if (recomputedHash !== current.hash) {
        return res.json({
          status: 'TAMPERED',
          message: `Data alteration detected at Record ID ${current.id}`,
          recordId: current.id
        });
      }
    }

    res.json({
      status: 'SECURE',
      message: 'All records verified successfully. Chain integrity intact.',
      totalRecords: records.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/records/:id - Update an existing exam record
app.put('/api/records/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const missing = validatePayload(req.body);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missing.join(', ')}`,
      });
    }

    const { student_id, student_name, subject, grade, teacher_id } = req.body;
    const query = `
      UPDATE exam_records
      SET student_id = $1,
          student_name = $2,
          subject = $3,
          grade = $4,
          teacher_id = $5,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [student_id, student_name, subject, grade, teacher_id, id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Exam record not found' });
    }

    return res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('[Database/Server Error]:', err.stack || err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});