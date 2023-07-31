import Joi from 'joi';

const schemaCustomers = Joi.object({
    name: Joi.string().trim().required(),
    phone: Joi.number().trim().required(),
    cpf: Joi.number().trim().required(),
    birthday: Joi.date().required(),
});

export default schemaCustomers;