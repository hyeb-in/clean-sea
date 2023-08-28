import express, { Router } from "express";
import {
  deleteUser,
  getRandomUser,
  getUser,
  resetPassword,
  signUpUser,
  updateUser, updateUserProfile,
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

userRouter.put('/photo', express.static("profileImage"), updateUserProfile)

userRouter
  .route("/:userId")
  .get(jwtAuthentication, getUser)
  .put(jwtAuthentication, handleFileUpload, validateUpdateUser, updateUser)
  .delete(jwtAuthentication, deleteUser);

export default userRouter;
