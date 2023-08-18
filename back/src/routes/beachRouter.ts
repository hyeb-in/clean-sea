import { Router } from 'express';
import { 
  getBeachByBeachName,
  getBeachByRegion,
  getBeaches
} from '../controllers/beachController';
import { validate, beachNameValidator, addressNameValidator } from '../utils/validators/beachValidator';
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const beachRouter = Router();

beachRouter
  .get('/beachbyname/:name', validate(beachNameValidator()), jwtAuthentication, getBeachByBeachName);

beachRouter
  .get('/beachesbyregion/:address', validate(addressNameValidator()), jwtAuthentication, getBeachByRegion);

beachRouter
  .get('/beaches', jwtAuthentication, getBeaches);

export default beachRouter;