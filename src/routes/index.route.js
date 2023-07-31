import { Router } from 'express';
import gamesRouter from './games.route';
import customersRouter from './customers.route';
import rentalsRouter from './rentals.route';

const router = Router();

router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;