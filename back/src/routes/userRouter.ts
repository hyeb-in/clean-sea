import { Router } from "express";
import {
  deleteUser,
  getUserInfo,
  signUpUser,
  updateUser,
} from "../controllers/userController";
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const userRouter = Router();

userRouter.post("/register", signUpUser);

userRouter.get("/tokentest", jwtAuthentication);

userRouter.get("/current", jwtAuthentication, getUserInfo);

userRouter
  .route("/:userId")
  .get(jwtAuthentication, getUserInfo)
  .put(jwtAuthentication, updateUser)
  .delete(jwtAuthentication, deleteUser);
export default userRouter;
