const { reviewAuthService } = require('../services/reviewService');

const createReview = async (req,res,next) => {
    try{
        const author = req.currentUserId;
        const addMyReview = await reviewAuthService.addReview({
            toCreate : {...req.body, author},
        });

        res.status(200).json(addMyReview);
    }catch(err){
        next(err);
    }
};

const getMyReview = async (req,res,next) => {
    try{
        const myReview = await reviewAuthService.getReview(req.currentUserId);

        res.status(200).json(myReview);
    }catch(err){
        next(err);
    }
}

const getUserReview = async (req,res,next) => {
    try{
        const userReview = await reviewAuthService.getReview(req.params.userId);

        res.status(200).json(userReview);
    }catch(err){
        next(err);
    }
}

const updateReview = async (req,res,next) => {
    try{
        const id = req.params.reviewId;
        const updatedReview = await reviewAuthService.setReview(id, {
            toUpdate : {...req.body},
        });

        res.status(200).json(updatedReview);
    }catch(err){
        next(err);
    }
}

const deleteReview = async (req,res,next) => {
    try{
        const deletedReview = await reviewAuthService.deleteReview(req.params.reviewId);

        res.status(200).json(deletedReview);
    }catch(err){
        next(err);
    }
}

module.exports = { createReview, getMyReview, getUserReview, updateReview, deleteReview };