import { createReview, findUserReviews, findUserReview, updateReview, deleteReview } from '../db/models/Review';
import { IReview } from '../types/review';

async function addReview({toCreate} : {toCreate: IReview}): Promise<IReview> {
    const createdReview = await createReview(toCreate);
    return createdReview;
}

async function getReview(userId : string) : Promise<IReview | null>{
    const review = await findUserReview(userId);
    return review;
}

async function setReview(reviewId : string,{toUpdate}:{toUpdate :Partial<IReview>}): Promise<IReview | null>{
    await findUserReviews(reviewId);

    const updatedReview = updateReview(reviewId, toUpdate);

    return updatedReview;
}

async function deletedReview(reviewId : string): Promise<IReview | null>{
    const deletedReview = await deleteReview(reviewId);

    return deletedReview;
}

export { addReview, getReview, setReview, deletedReview };