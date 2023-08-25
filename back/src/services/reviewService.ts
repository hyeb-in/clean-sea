import { createReview, findAllReviews, findUserReviews, findReview, updateReview, deleteReview } from '../db/models/Review';
import { IReview } from '../types/review';

async function addReview({toCreate} : {toCreate: IReview}): Promise<IReview> {
    const createdReview = await createReview(toCreate);
    return createdReview;
}

async function getReview() : Promise<IReview[]>{
    const review = await findAllReviews();
    return review;
}

async function getLoginReview(author : string) : Promise<IReview[]>{
    const loginReview = await findUserReviews(author);
    return loginReview;
}

async function setReview(reviewId : string,{toUpdate}:{toUpdate :any}): Promise<IReview | null>{
    await findReview(reviewId);

    const updatedReview = updateReview(reviewId, toUpdate);

    return updatedReview;
}

async function deletedReview(reviewId : string): Promise<IReview | null>{
    const deletedReview = await deleteReview(reviewId);

    return deletedReview;
}

export { addReview, getReview, getLoginReview, setReview, deletedReview };