import { Review } from '../db/models/Review';
import { IReview } from '../interfaces/review';

class ReviewAuthService {
    static async addReview({toCreate} : {toCreate : IReview}): Promise<IReview>{
        const createReview = await Review.create(toCreate);
        return createReview;
    }

    static async getReview(userId : string) : Promise<IReview[]> {
        const user = await Review.findUser(userId);
        return user;
    }

    static async setReview(reviewId : string,{toUpdate} : {toUpdate :Partial<IReview>}): Promise<IReview | null>{
        await Review.findReview(reviewId);

        const updatedReview = Review.update(reviewId, toUpdate);

        return updatedReview;
    }

    static async deleteReview(reviewId : string): Promise<IReview | null>{
        const deletedReview = await Review.delete(reviewId);

        return deletedReview;
    }
}

export { ReviewAuthService };