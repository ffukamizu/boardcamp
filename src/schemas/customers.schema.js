import Joi from 'joi';

const schemaCustomers = Joi.object({
    name: Joi.string().min(2).required(),
    phone: Joi.number().min(2).required(),
    cpf: Joi.string().pattern(/^\d{11}$/).required(),
    birthday: Joi.string().isoDate().required(),
});

export default schemaCustomers;
