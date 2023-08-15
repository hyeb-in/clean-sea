//import { login_required } from "../middlewares/login_required";
import { beachController } from "../controllers/beachController";

const Router = require("express");

const beachRouter = Router();

beachRouter.get("/beaches", beachController.getBeaches);

export { beachRouter };
