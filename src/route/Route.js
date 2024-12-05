import { Router } from 'express';
import { getShirts, addShirt } from '../controller/shirtController.js';
import { registerUser, loginUser } from '../controller/userController.js';
import { getCart, addToCart, updateCartItem, clearCart } from '../controller/cartController.js';

const router = Router();

// Rutas para shirts
router.get('/shirts', getShirts);
router.post('/shirts', addShirt);

// Rutas para users
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rutas para el carrito
router.get('/cart', getCart);
router.post('/cart/add', addToCart);
router.put('/cart/update/:id', updateCartItem);
router.delete('/cart/clear', clearCart);

export default router;

