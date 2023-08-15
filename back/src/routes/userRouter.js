import { Router } from "express";
import { login, signUpUser } from "../controllers/userController";
import { local } from "../config/passport";
import { localAuthentication } from "../controllers/authenticateLocal";
import { jwtAuthentication } from "../middlewares/authenticateJwt";

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
userRouter.post("/login", localAuthentication);

/**
 * @swagger
 * /users/logout:
 *  post:
 *      tags: [User]
 *      summary: logout
 */
userRouter.post("/logout");
userRouter.post("/tokentest", jwtAuthentication);
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
