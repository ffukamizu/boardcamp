import { Router } from 'express';
import { getRentals, postRentals, postRentalsId, deleteRentals } from '../controllers/rentals.controller.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';
import schemaRentals from '../schemas/rentals.schema.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateSchema(schemaRentals), postRentals);
rentalsRouter.post('/rentals/:id/return', postRentalsId);
rentalsRouter.delete('/rentals/:id', deleteRentals);

export default rentalsRouter;
