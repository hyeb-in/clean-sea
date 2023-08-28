import { Router } from "express";
import {
  createReview,
  getAllReview,
  getAllLogin,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";
import { jwtAuthentication } from "../middlewares/authenticateJwt";
import { handleFileUpload } from "../middlewares/uploadMiddleware";
import {
  postReviewValidator,
  putReviewValidator,
} from "../utils/validators/reviewValidator";
const reviewAuthRouter = Router();

reviewAuthRouter
  //TODO handleFileUpload랑 validator 순서 변경 해야하지 않은지?
  .post(
    "/register",
    jwtAuthentication,
    handleFileUpload,
    postReviewValidator,
    createReview
  )
  .get("/reviewList", getAllReview)
  .get("/reviewListLogin", jwtAuthentication, getAllLogin);

reviewAuthRouter
  .route("/:reviewId")
  .put(jwtAuthentication, handleFileUpload, putReviewValidator, updateReview)
  .delete(jwtAuthentication, deleteReview);

export default reviewAuthRouter;
