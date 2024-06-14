import { Router } from 'express';
import { pool } from '../db';
import { ResultSetHeader } from 'mysql2';

const router = Router();

router.get('/shirts', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM shirts');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shirts', error });
  }
});

router.post('/shirts', async (req, res) => {
  const { color, model, price } = req.body;
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO shirts (color, model, price) VALUES (?, ?, ?)',
      [color, model, price]
    );
    res.status(201).json({ id: result.insertId, color, model, price });
  } catch (error) {
    res.status(500).json({ message: 'Error adding shirt', error });
  }
});

export default router;
