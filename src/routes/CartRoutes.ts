import { Router } from 'express';
import { createCart, getCartById, getCartItemsByCartId, addItemToCart } from '../db';

const router = Router();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const cartId = await createCart();
        res.json({ id: cartId });
    } catch (error) {
        res.status(500).json({ message: "Error creating cart", error });
    }
});

// Añadir un producto al carrito
router.post('/:cartId/items', async (req, res) => {
    const { cartId } = req.params;
    const { productId, productName, price, quantity } = req.body;
    
    try {
        const cart = await getCartById(Number(cartId));
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemId = await addItemToCart(Number(cartId), productId, productName, price, quantity);
        res.json({ id: itemId });
    } catch (error) {
        res.status(500).json({ message: "Error adding item to cart", error });
    }
});

// Obtener los detalles del carrito
router.get('/:cartId', async (req, res) => {
    const { cartId } = req.params;
    
    try {
        const cart = await getCartById(Number(cartId));
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const items = await getCartItemsByCartId(Number(cartId));
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        res.json({ ...cart, items, total });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cart", error });
    }
});

export default router;
