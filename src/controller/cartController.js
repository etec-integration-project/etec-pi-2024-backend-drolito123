const express = require("express");
const router = express.Router();

// Carrito en memoria (simulación)
let cart = [];

// Obtener el carrito
router.get("/", (req, res) => {
    res.json(cart);
});

// Agregar un producto al carrito
router.post("/add", (req, res) => {
    const { id, name, price, quantity } = req.body;

    // Verificar si el producto ya existe en el carrito
    const existingProduct = cart.find((item) => item.id === id);

    if (existingProduct) {
        // Si existe, actualizar la cantidad
        existingProduct.quantity += quantity;
    } else {
        // Si no existe, agregarlo al carrito
        cart.push({ id, name, price, quantity });
    }

    res.json(cart);
});

// Actualizar la cantidad de un producto en el carrito
router.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const product = cart.find((item) => item.id === parseInt(id));

    if (product) {
        // Si la cantidad es mayor a 0, actualiza
        if (quantity > 0) {
            product.quantity = quantity;
        } else {
            // Si la cantidad es 0 o menor, eliminar del carrito
            cart = cart.filter((item) => item.id !== parseInt(id));
        }
        res.json(cart);
    } else {
        res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }
});

// Vaciar el carrito
router.delete("/clear", (req, res) => {
    cart = [];
    res.json({ message: "Carrito vaciado", cart });
});

// Exportar las rutas del carrito
module.exports = router;
