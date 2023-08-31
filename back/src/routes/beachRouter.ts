import { Router } from "express";
import {
  getBeachByName,
  getBeachById,
  getBeachByRegionAndYear,
  getBeachByRegionAndYearSpecificAvg,
  getBeaches,
  getBeachByRegionAndYearSpecific,
} from "../controllers/beachController";
import { beachParamsValidator } from "../utils/validators/beachValidator";
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const beachRouter = Router();

beachRouter.get("/beaches/name/:name", jwtAuthentication, getBeachByName);

beachRouter.get("/beachbyId/:_id", jwtAuthentication, getBeachById);

beachRouter.get(
  "/beaches/:year/:address",
  jwtAuthentication,
  getBeachByRegionAndYear
);

beachRouter.get(
  "/beachesavg/:year",
  jwtAuthentication,
  beachParamsValidator,
  getBeachByRegionAndYearSpecificAvg
);

beachRouter.get(
  "/beaches/:year",
  jwtAuthentication,
  getBeachByRegionAndYearSpecific
);

beachRouter.get("/beaches", jwtAuthentication, getBeaches);

export default beachRouter;
