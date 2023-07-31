import { Router } from 'express';
import { getCustomers, getCustomersId, postCustomers, putCustomers } from '../controllers/customers.controller.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';
import schemaCustomers from '../schemas/customers.schema.js';

const customersRouter = Router();

customersRouter.get('/customers',  getCustomers);
customersRouter.get('/customers/:id', getCustomersId);
customersRouter.post('/customers', validateSchema(schemaCustomers), postCustomers);
customersRouter.put('/customers/:id', validateSchema(schemaCustomers), putCustomers);

export default customersRouter;
