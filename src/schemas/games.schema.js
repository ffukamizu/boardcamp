import Joi from 'joi';

const schemaGames = Joi.object({
    name: Joi.string().min(2).required(),
    image: Joi.required(),
    stockTotal: Joi.number().min(2).required(),
    pricePerDay: Joi.number().min(2).required(),
});

export default schemaGames;