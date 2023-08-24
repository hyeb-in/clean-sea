import { Router } from 'express';
import { 
  getBeachById,
  getBeachByRegionAndYear,
  getBeaches
} from '../controllers/beachController';
import { validateBeachId, validateBeachAddress, validateBeachYear } from '../utils/validators/beachValidator';
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const beachRouter = Router();

beachRouter
  .get('/beachbyId/:_id', getBeachById);

beachRouter
  .get('/beachesbyregion/:address/:year', getBeachByRegionAndYear);
  // .get('/beachesbyregion/:address/:year', validateBeachAddress, jwtAuthentication, getBeachByRegionAndYear);

beachRouter
  .get('/beaches', getBeaches);

export default beachRouter;