import { Router } from 'express';
import gamesRouter from './games.route.js';
import customersRouter from './customers.route.js';
import rentalsRouter from './rentals.route.js';

const router = Router();

router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;
