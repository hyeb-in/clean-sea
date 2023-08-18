"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const authenticateJwt_1 = require("../middlewares/authenticateJwt");
const reviewAuthRouter = (0, express_1.Router)();
reviewAuthRouter
    .post("/register", authenticateJwt_1.jwtAuthentication, reviewController_1.createReview)
    .get("/reviewList", authenticateJwt_1.jwtAuthentication, reviewController_1.getMyReview);
reviewAuthRouter.get("/:userId", authenticateJwt_1.jwtAuthentication, reviewController_1.getUserReview);
reviewAuthRouter
    .route("/:reviewId")
    .put(authenticateJwt_1.jwtAuthentication, reviewController_1.updateReview)
    .delete(authenticateJwt_1.jwtAuthentication, reviewController_1.deleteReview);
exports.default = reviewAuthRouter;
//# sourceMappingURL=reviewRouter.js.map