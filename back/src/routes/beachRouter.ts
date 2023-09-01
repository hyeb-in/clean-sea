import { Router } from "express";
import {
  getBeachByName,
  getBeachById,
  getBeachByRegionAndYear,
  getBeachByRegionAndYearSpecificAvg,
  getBeaches,
  getBeachByRegionAndYearSpecific
} from '../controllers/beachController';
import { yearAddressParamsValidator, beachParamsValidator, idParamValidator, nameParamValidator} from '../utils/validators/beachValidator';
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const beachRouter = Router();

beachRouter
  .get("/beaches/name/:name", nameParamValidator, getBeachByName);

beachRouter
  .get("/beachbyId/:_id", idParamValidator, getBeachById);

beachRouter
  .get('/beaches/:year/:address', yearAddressParamsValidator, getBeachByRegionAndYear);

beachRouter
  .get('/beachesavg/:year', beachParamsValidator, getBeachByRegionAndYearSpecificAvg);

beachRouter
  .get('/beaches/:year', beachParamsValidator, getBeachByRegionAndYearSpecific);

beachRouter
  .get("/beaches", getBeaches);

export default beachRouter;