import Joi from 'joi';

const schemaGames = Joi.object({
    name: Joi.string().trim().required(),
    image: Joi.string().uri().required(),
    stockTotal: Joi.number().integer().greater(0).required(),
    pricePerDay: Joi.number().integer().greater(0).required(),
});

export default schemaGames;