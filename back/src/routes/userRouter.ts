import { Router } from "express";
import { getUserInfo, signUpUser } from "../controllers/userController";
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const userRouter = Router();

userRouter.post("/register", signUpUser);

userRouter.get("/tokentest", jwtAuthentication);

userRouter.get("/current", jwtAuthentication, getUserInfo);

userRouter
  .route("/:id")
  .get(jwtAuthentication, getUserInfo)
  .put(jwtAuthentication)
  .delete(jwtAuthentication);
export default userRouter;
