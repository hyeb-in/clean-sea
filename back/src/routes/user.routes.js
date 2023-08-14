import { Router } from "express";

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
userRouter.post("/register", (req, res, next) => {
  res.send("test");
  console.log("test");
});

/**
 * @swagger
 * /users/login:
 *  post:
 *      tags: [User]
 *      summary: login
 *
 */
userRouter.post("/login");

/**
 * @swagger
 * /users/logout:
 *  post:
 *      tags: [User]
 *      summary: logout
 */
userRouter.post("/logout");

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
