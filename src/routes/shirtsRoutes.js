import { Router } from 'express';
import { getShirts, addShirt } from '../controllers/shirtController';

const router = Router();

router.get('/shirts', getShirts);
router.post('/shirts', addShirt);

export {router}
