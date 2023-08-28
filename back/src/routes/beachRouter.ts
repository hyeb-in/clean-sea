import { Router } from "express";
import {
  getBeachByBeachName,
  getBeachById,
  getBeachByRegionAndYear,
  getBeaches,
} from "../controllers/beachController";
import { beachValidator } from "../utils/validators/beachValidator";
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const beachRouter = Router();

beachRouter.get("/beachbyId/:_id", getBeachById);
// .get('/beachbyId/:_id', beachValidator.getBeach, jwtAuthentication, getBeachById);

beachRouter.get("/beachbyname/:name", getBeachByBeachName);

beachRouter.get("/beachesbyregion/:address/:year", getBeachByRegionAndYear);
// .get('/beachesbyregion/:address/:year', beachValidator.getBeachAndYear, jwtAuthentication, getBeachByRegionAndYear);

beachRouter.get("/beaches", jwtAuthentication, getBeaches);

export default beachRouter;
