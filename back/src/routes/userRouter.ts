import { Router } from "express";
import { signUpUser } from "../controllers/userController";
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const userRouter = Router();

userRouter.post("/register", signUpUser);

userRouter.get("/tokentest", jwtAuthentication);

userRouter.route("/:id").get().put().delete();
export default userRouter;
