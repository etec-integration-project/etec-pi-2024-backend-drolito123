import { Router } from 'express';
import { getAllShorts, getShortById } from '../db';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const shorts = await getAllShorts();
        res.json(shorts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los shorts' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const short = await getShortById(parseInt(req.params.id));
        if (short) {
            res.json(short);
        } else {
            res.status(404).json({ error: 'Short no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el short' });
    }
});

export default router;
