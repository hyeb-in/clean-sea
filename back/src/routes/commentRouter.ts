import { Router } from 'express';
import {
    createComment,
    getReviewComment,
    updateComment,
    deleteComment,
} from "../controllers/commentController";
import { jwtAuthentication } from "../middlewares/authenticateJwt";
import { postCommentValidator, putCommentValidator } from '../utils/validators/commentValidator';

const commentAuthRouter = Router();

commentAuthRouter
    .post('/:reviewId', jwtAuthentication, postCommentValidator, createComment)
    .get('/:reviewId', jwtAuthentication, getReviewComment);

commentAuthRouter
    .route('/:commentId')
    .put(jwtAuthentication, putCommentValidator, updateComment)
    .delete(jwtAuthentication, deleteComment);

export default commentAuthRouter;