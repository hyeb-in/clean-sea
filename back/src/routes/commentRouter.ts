import { Router } from 'express';
import {
    createComment,
    getReviewComment,
    updateComment,
    deleteComment,
} from "../controllers/commentController";
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const commentAuthRouter = Router();

commentAuthRouter
    .post('/:reviewId', jwtAuthentication, createComment)
    .get('/:reviewId', jwtAuthentication, getReviewComment);

commentAuthRouter
    .route('/:commentId')
    .put(jwtAuthentication, updateComment)
    .delete(jwtAuthentication, deleteComment);

export default commentAuthRouter;