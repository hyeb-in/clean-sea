import { Router } from 'express';
import { 
  getBeachByBeachName,
  getBeachByRegion,
  getBeaches
} from '../controllers/beachController';
import { validateBeachName, validateBeachAddress } from '../utils/validators/beachValidator';
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const beachRouter = Router();

beachRouter
  .get('/beachbyname/:name', validateBeachName, jwtAuthentication, getBeachByBeachName);

beachRouter
  .get('/beachesbyregion/:address', validateBeachAddress, jwtAuthentication, getBeachByRegion);

beachRouter
  .get('/beaches', jwtAuthentication, getBeaches);

export default beachRouter;