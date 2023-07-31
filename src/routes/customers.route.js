import { Router } from 'express';
import { getCustomers, getCustomersId, postCustomers, putCustomers } from '../controllers/customers.controller';
import validateSchema from '../middlewares/validateSchema.middleware';
import schemaCustomers from '../schemas/customers.schema';

const customersRouter = Router();

customersRouter.get('/customers',  getCustomers);
customersRouter.get('/customers/:id', getCustomersId);
customersRouter.post('/customers', validateSchema(schemaCustomers), postCustomers);
customersRouter.put('/customers/:id', validateSchema(schemaCustomers), putCustomers);

export default customersRouter;