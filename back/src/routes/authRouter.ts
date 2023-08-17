import { Router } from "express";
import { localAuthentication } from "../middlewares/authenticateLocal";
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const authRouter = Router();

authRouter.post("/login", localAuthentication);
authRouter.get("/current", jwtAuthentication);

export default authRouter;
