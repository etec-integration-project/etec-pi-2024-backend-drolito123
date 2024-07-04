import { Router } from 'express';
import { createUser, getUserByUsername } from '../db';

const router = Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const userId = await createUser(username, password);
    res.status(201).json({ id: userId, username });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ id: user.id, username });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

export default router;
