import { Router } from 'express';
import { getAllCamperas, getCamperaById } from '../db';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const camperas = await getAllCamperas();
        res.json(camperas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las camperas' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const campera = await getCamperaById(parseInt(req.params.id));
        if (campera) {
            res.json(campera);
        } else {
            res.status(404).json({ error: 'Campera no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la campera' });
    }
});

export default router;
