import { Router } from "express";
import { loginUser, signUpUser } from "../controllers/userController";
import { jwtAuthentication } from "../middlewares/authenticateJwt";
import { localAuthentication } from "../middlewares/authenticateLocal";

const userRouter = Router();

userRouter.post("/register", signUpUser);

userRouter.post("/login", localAuthentication, loginUser);

userRouter.get("/tokentest", jwtAuthentication);

userRouter.route("/:id").get().put().delete();
export default userRouter;
