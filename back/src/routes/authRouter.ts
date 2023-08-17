import { Router } from "express";
import { localAuthentication } from "../middlewares/authenticateLocal";
import { jwtAuthentication } from "../middlewares/authenticateJwt";
import { getUserInfo } from "../controllers/userController";

const authRouter = Router();

authRouter.post("/login", localAuthentication);

export default authRouter;
