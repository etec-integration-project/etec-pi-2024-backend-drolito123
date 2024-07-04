import { Router } from 'express';
import { getAllShirts, getShirtById } from '../db';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const shirts = await getAllShirts();
        res.json(shirts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las remeras' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const shirt = await getShirtById(parseInt(req.params.id));
        if (shirt) {
            res.json(shirt);
        } else {
            res.status(404).json({ error: 'Remera no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la remera' });
    }
});

export default router;
