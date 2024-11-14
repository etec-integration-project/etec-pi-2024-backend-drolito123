import { Router } from 'express';
import { shirtModel } from '../db';

const router = Router();

// Ruta para obtener todas las remeras
router.get('/', async (req, res) => {
    try {
        const shirts = await shirtModel.getAllShirts();
        res.json(shirts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las remeras' });
    }
});

// Ruta para obtener una remera por ID
router.get('/:id', async (req, res) => {
    try {
        const shirt = await shirtModel.getShirtById(parseInt(req.params.id));
        if (shirt) {
            res.json(shirt);
        } else {
            res.status(404).json({ error: 'Remera no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la remera' });
    }
});

// Ruta para añadir una nueva remera
router.post('/add', async (req, res) => {
    const { name, color, size, price } = req.body;

    if (!name || !color || !size || price == null) {
        return res.status(400).json({ error: 'Faltan datos de la remera' });
    }

    try {
        const shirtId = await shirtModel.addShirt(name, color, size, price);
        res.status(201).json({ message: 'Remera añadida correctamente', shirtId });
    } catch (error) {
        console.error('Error al añadir la remera:', error);
        res.status(500).json({ error: 'Error al añadir la remera' });
    }
});

export default router;
