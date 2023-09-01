import { Router } from "express";
import {
  createReview,
  getAllReview,
  getAllLogin,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";
import { jwtAuthentication } from "../middlewares/authenticateJwt";
import { fileUpload } from "../middlewares/uploadMiddleware";
import {
  postReviewValidator,
  putReviewValidator,
} from "../utils/validators/reviewValidator";
const reviewAuthRouter = Router();

reviewAuthRouter
  .post(
    "/register",
    jwtAuthentication,
    fileUpload,
    postReviewValidator,
    createReview
  )
  .get("/reviewList", getAllReview)
  .get("/reviewListLogin", jwtAuthentication, getAllLogin);

reviewAuthRouter
  .route("/:reviewId")
  .put(jwtAuthentication, fileUpload, putReviewValidator, updateReview)
  .delete(jwtAuthentication, deleteReview);

export default reviewAuthRouter;
