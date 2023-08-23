import { Router } from 'express';
import { 
  getBeachById,
  getBeachByRegion,
  getBeaches
} from '../controllers/beachController';
import { validateBeachName, validateBeachAddress } from '../utils/validators/beachValidator';
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const beachRouter = Router();

beachRouter
  .get('/beachbyId/:_id', validateBeachName, jwtAuthentication, getBeachById);

beachRouter
  .get('/beachesbyregion/:address', validateBeachAddress, jwtAuthentication, getBeachByRegion);

beachRouter
  .get('/beaches', jwtAuthentication, getBeaches);

export default beachRouter;