import { Router } from "express";
import { loginUser, signUpUser } from "../controllers/userController";
import { jwtAuthentication } from "../middlewares/authenticateJwt";
import { localAuthentication } from "../middlewares/authenticateLocal";

/**
 * @swagger
 *  tags:
 *      name: User
 *      description: User API
 */

const userRouter = Router();

/**
 * @swagger
 * /users/register:
 *  post:
 *      tags: [User]
 *      summary: sign up
 */
userRouter.post("/register", signUpUser);

/**
 * @swagger
 * /users/login:
 *  post:
 *      tags: [User]
 *      summary: login
 *
 */
userRouter.post("/login", localAuthentication, loginUser);

/**
 * @swagger
 * /users/logout:
 *  post:
 *      tags: [User]
 *      summary: logout
 */
const testMiddle = (req, res, next) => {
  next();
};
userRouter.post("/logout");
userRouter.get("/tokentest", testMiddle, jwtAuthentication);
/**
 * @swagger
 * /users/{id}:
 *  get:
 *      tags: [User]
 *      summary: get user info
 *  put:
 *      tags: [User]
 *      summary: update user info
 *  delete:
 *      tags: [User]
 *      summary: delete user
 */
userRouter.route("/:id").get().put().delete();
export default userRouter;
