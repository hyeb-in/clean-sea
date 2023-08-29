import { Router } from "express";
import {
  changePassword,
  deleteUser,
  getRandomUser,
  getUser,
  resetPassword,
  signUpUser,
  updateUser,
} from '../controllers/userController'
import { jwtAuthentication } from '../middlewares/authenticateJwt'
import {
  validateSignUp,
  validateUpdateUser,
} from "../utils/validators/userValidator";
import { handleFileUpload } from "../middlewares/uploadMiddleware";

const userRouter = Router();

userRouter.post("/register", validateSignUp, signUpUser);

userRouter.get("/tokentest", jwtAuthentication);

userRouter.get("/current", jwtAuthentication, getUser);

userRouter.get("/randomlist", jwtAuthentication, getRandomUser);

userRouter.post("/reset-password", resetPassword);

userRouter.post("/:userId/change-password", changePassword);

userRouter
  .route("/:userId")
  .get(jwtAuthentication, getUser)
  .put(jwtAuthentication, handleFileUpload, validateUpdateUser, updateUser)
  .delete(jwtAuthentication, deleteUser);

export default userRouter;
