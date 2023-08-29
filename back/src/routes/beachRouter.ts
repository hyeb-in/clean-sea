import { Router } from "express";
import {
  getBeachByName,
  getBeachById,
  getBeachByRegionAndYearSpecificAvg,
  getBeaches,
  getBeachByRegionAndYearSpecific
} from '../controllers/beachController';
import { beachValidator } from '../utils/validators/beachValidator';
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const beachRouter = Router();

beachRouter.get("/beaches/name/:name", getBeachByName);
  // .get('/beachbyId/:_id', beachValidator.getBeach, jwtAuthentication, getBeachById);

beachRouter.get("/beachbyId/:_id", getBeachById);
  // .get('/beachbyId/:_id', beachValidator.getBeach, jwtAuthentication, getBeachById);

beachRouter
  .get('/beachesavg/:year', getBeachByRegionAndYearSpecificAvg);
  // .get('/beaches/:year', beachValidator.getBeachAndYear, jwtAuthentication, getBeachByRegionAndYear);

beachRouter
  .get('/beaches/:year', getBeachByRegionAndYearSpecific);
  // .get('/beaches/:year', beachValidator.getBeachAndYear, jwtAuthentication, getBeachByRegionAndYear);

beachRouter
  .get("/beaches", getBeaches);
  // .get("/beaches", jwtAuthentication, getBeaches);

export default beachRouter;