import { Router } from "express";
import {
  createReview,
  getMyReview,
  getUserReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";
import { localAuthentication } from "../middlewares/authenticateLocal";

const reviewAuthRouter = Router();

reviewAuthRouter
    .post("/register", createReview)
    .get("/reviewList", getMyReview);

reviewAuthRouter.get("/:userId", getUserReview);

reviewAuthRouter
    .route("/:reviewId")
    .put( updateReview)
    .delete( deleteReview);

export default reviewAuthRouter;
