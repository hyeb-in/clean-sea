const {
    createReview,
    getMyReview,
    getUserReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController');

const Router = require('express');

const reviewRouter = Router();

reviewRouter
    .post(createReview)
    .get(getMyReview);

reviewRouter.get('/:userId', getUserReview);

reviewRouter
    .router('/:reviewId')
    .put(updateReview)
    .delete(deleteReview);

module.exports = { reviewRouter };