import { Router } from "express";
import { localAuthentication } from "../middlewares/authenticateLocal";
import { loginUser } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", localAuthentication, loginUser);
authRouter.post("/logout");

export default authRouter;
