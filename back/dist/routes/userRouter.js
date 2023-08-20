"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authenticateJwt_1 = require("../middlewares/authenticateJwt");
const userRouter = (0, express_1.Router)();
userRouter.post("/register", userController_1.signUpUser);
userRouter.get("/tokentest", authenticateJwt_1.jwtAuthentication);
userRouter.get("/current", authenticateJwt_1.jwtAuthentication, userController_1.getUser);
userRouter
    .route("/:userId")
    .get(authenticateJwt_1.jwtAuthentication, userController_1.getUser)
    .put(authenticateJwt_1.jwtAuthentication, userController_1.updateUser)
    .delete(authenticateJwt_1.jwtAuthentication, userController_1.deleteUser);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map