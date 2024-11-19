import { Router } from 'express';
import { getShirts, addShirt } from '../controller/shirtController';

const router = Router();

router.get('/shirts', getShirts);
router.post('/shirts', addShirt);

export {router}
