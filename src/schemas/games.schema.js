import Joi from 'joi';

const schemaGames = Joi.object({
    name: Joi.string().required(),
    image: Joi.required(),
    stockTotal: Joi.number().required(),
    pricePerDay: Joi.number().required(),
});

export default schemaGames;