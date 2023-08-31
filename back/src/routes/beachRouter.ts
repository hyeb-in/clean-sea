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
  .get("/beaches/name/:name", jwtAuthentication, nameParamValidator, getBeachByName);

beachRouter
  .get("/beachbyId/:_id", jwtAuthentication, idParamValidator, getBeachById);

beachRouter
  .get('/beaches/:year/:address', jwtAuthentication, yearAddressParamsValidator, getBeachByRegionAndYear);

beachRouter
  .get('/beachesavg/:year', jwtAuthentication, beachParamsValidator, getBeachByRegionAndYearSpecificAvg);

beachRouter
  .get('/beaches/:year', jwtAuthentication, beachParamsValidator, getBeachByRegionAndYearSpecific);

beachRouter
  .get("/beaches", jwtAuthentication, getBeaches);

export default beachRouter;