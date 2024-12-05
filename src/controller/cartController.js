// Carrito en memoria (simulación)
let cart = [];

// Obtener el carrito
export const getCart = (req, res) => {
    res.json(cart);
};

// Agregar un producto al carrito
export const addToCart = (req, res) => {
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
};

// Actualizar la cantidad de un producto en el carrito
export const updateCartItem = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const product = cart.find((item) => item.id === parseInt(id));

    if (product) {
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
};

// Vaciar el carrito
export const clearCart = (req, res) => {
    cart = [];
    res.json({ message: "Carrito vaciado", cart });
};
