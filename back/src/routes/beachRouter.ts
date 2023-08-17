import { Router } from 'express';
import { beachController } from '../controllers/beachController';

const beachRouter = Router();

beachRouter.get('/beaches', beachController.getBeachByBeachName);
beachRouter.get('/beaches', beachController.getBeachByRegion);
beachRouter.get('/beaches', beachController.getBeaches);

export { beachRouter };