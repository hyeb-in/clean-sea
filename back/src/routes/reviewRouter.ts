import { Router } from "express";
import {
  createReview,
  getMyReview,
  getUserReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const reviewAuthRouter = Router();

reviewAuthRouter
    .post("/register", jwtAuthentication, createReview)
    .get("/reviewList", jwtAuthentication, getMyReview);

reviewAuthRouter.get("/:userId", jwtAuthentication, getUserReview);

reviewAuthRouter
    .route("/:reviewId")
    .put(jwtAuthentication, updateReview)
    .delete(jwtAuthentication, deleteReview);

export default reviewAuthRouter;
