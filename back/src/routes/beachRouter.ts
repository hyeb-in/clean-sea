import { Router } from "express";
import {
  getBeachByName,
  getBeachById,
  getBeachByRegionAndYear,
  getBeachByRegionAndYearSpecificAvg,
  getBeaches,
  getBeachByRegionAndYearSpecific,
} from "../controllers/beachController";
import { beachValidator } from "../utils/validators/beachValidator";
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const beachRouter = Router();

beachRouter.get(
  "/beaches/name/:name",
  jwtAuthentication,
  beachValidator.getBeachByName,
  getBeachByName
);

beachRouter.get(
  "/beachbyId/:_id",
  jwtAuthentication,
  beachValidator.getBeachById,
  getBeachById
);

beachRouter.get(
  "/beaches/:year/:address",
  jwtAuthentication,
  beachValidator.getBeachByRegionAndYear,
  getBeachByRegionAndYear
);

beachRouter.get(
  "/beachesavg/:year",
  jwtAuthentication,
  beachValidator.getBeachByRegionAndYearSpecificAvg,
  getBeachByRegionAndYearSpecificAvg
);

beachRouter.get(
  "/beaches/:year",
  jwtAuthentication,
  beachValidator.getBeachByRegionAndYearSpecific,
  getBeachByRegionAndYearSpecific
);

beachRouter.get("/beaches", jwtAuthentication, getBeaches);

export default beachRouter;
