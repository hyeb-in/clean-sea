const { Review } = require('../db/models/Review');

class reviewAuthService {
    static async addReview({toCreate}){
        const createReview = await Review.create(toCreate);
        return createReview;
    }

    static async getReview(userId){
        const user = await Review.findUser(userId);
    }

    static async setReview(id,{toUpdate}){
        const reviewId = await Review.findReview(id);

        const updatedReview = Review.update(reviewId, toUpdate);

        return updatedReview;
    }

    static async deleteReview(reviewId){
        const deletedReview = await Review.delete(reviewId);

        return deletedReview;
    }
}

export { reviewAuthService };