import { Router } from 'express';
import { getShirts, addShirt } from '../controller/shirtController.js';
import { registerUser, loginUser } from '../controller/userController.js';

const router = Router();

// Rutas para shirts
router.get('/shirts', getShirts);
router.post('/shirts', addShirt);

// Rutas para users
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
