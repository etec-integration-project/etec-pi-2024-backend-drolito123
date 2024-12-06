import { Router } from 'express';
import { getShirts, addShirt } from '../controller/shirtController.js';
import { registerUser, loginUser, logout } from '../controller/userController.js';
import { buyCart } from '../controller/cartController.js';

const router = Router();

// Rutas para shirts
router.get('/shirts', getShirts);
router.post('/shirts', addShirt);

// Rutas para users
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logout);

// Rutas para cart
router.post('/buy', buyCart)


export default router;
