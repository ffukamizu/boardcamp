import { Router } from 'express';
import { getGames, postGames } from '../controllers/games.controller';
import validateSchema from '../middlewares/validateSchema.middleware.js';
import schemaGames from '../schemas/games.schema';

const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', validateSchema(schemaGames), postGames);

export default gamesRouter;