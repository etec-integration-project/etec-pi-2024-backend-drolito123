import { Router } from 'express';
import { getShirts, addShirt } from '../controller/shirtController.js';

const router = Router();

router.get('/shirts', getShirts);
router.post('/shirts', addShirt);

export {router}
