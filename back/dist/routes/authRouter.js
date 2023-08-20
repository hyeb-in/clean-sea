"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateLocal_1 = require("../middlewares/authenticateLocal");
const authController_1 = require("../controllers/authController");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", authenticateLocal_1.localAuthentication, authController_1.loginUser);
authRouter.post("/logout");
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map