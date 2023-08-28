import { Router } from "express";
import { localAuthentication } from "../middlewares/authenticateLocal";
import { loginUser } from "../controllers/authController";
import { validateLogin } from "../utils/validators/userValidator";

const authRouter = Router();

authRouter.post("/login", validateLogin, localAuthentication, loginUser);
authRouter.post("/logout");

export default authRouter;
