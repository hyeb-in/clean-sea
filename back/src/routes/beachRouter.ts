import { Router } from 'express';
import {
  getBeachByBeachName,
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
.get('/beachbyname/:name', getBeachByBeachName);

beachRouter
  .get('/beachesbyregion/:address/:year', getBeachByRegionAndYear);
  // .get('/beachesbyregion/:address/:year', validateBeachAddress, jwtAuthentication, getBeachByRegionAndYear);

beachRouter
  .get('/beaches', getBeaches);

export default beachRouter;
