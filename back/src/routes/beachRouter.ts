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
  .get('/beachbyId/:_id', validateBeachId, jwtAuthentication, getBeachById);

beachRouter
  .get('/beachesbyregion/:address/:year', jwtAuthentication, getBeachByRegionAndYear);
  // .get('/beachesbyregion/:address/:year', validateBeachAddress, jwtAuthentication, getBeachByRegionAndYear);

beachRouter
  .get('/beaches', jwtAuthentication, getBeaches);

export default beachRouter;