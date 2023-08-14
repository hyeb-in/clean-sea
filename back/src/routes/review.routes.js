import { Router } from "express";
const {
    createReview,
    getMyReview,
    getUserReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController');

const reviewAuthRouter = Router();



reviewAuthRouter
    .route('/')
    .post(createReview)
    .get(getMyReview);


reviewAuthRouter
    .route('/:userId')
    .get(getUserReview);



reviewAuthRouter
    .route('/:reviewId')
    .put(updateReview)
    .delete(deleteReview);

export default reviewAuthRouter;