import { Router } from "express";
import {
  deleteUser,
  getUser,
  signUpUser,
  updateUser,
} from "../controllers/userController";
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const userRouter = Router();

userRouter.post("/register", signUpUser);

userRouter.get("/tokentest", jwtAuthentication);

userRouter.get("/current", jwtAuthentication, getUser);

userRouter
  .route("/:userId")
  .get(jwtAuthentication, getUser)
  .put(jwtAuthentication, updateUser)
  .delete(jwtAuthentication, deleteUser);
export default userRouter;
