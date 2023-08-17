import { ReviewModel } from '../schemas/reviewSchema';
import { IReview } from '../../types/review';

async function createReview(toCreate:IReview) : Promise<IReview>{
  const newReview = await ReviewModel.create(toCreate);
  return newReview;
}

async function findUserReviews(userId: string): Promise<IReview[]> {
  const userReviews = await ReviewModel.find({ author: userId });

  return userReviews;
}

async function findUserReview(reviewId : string): Promise<IReview | null> {
  const review = await ReviewModel.findOne({ author: reviewId });

  return review;
}

async function updateReview(id : string, toUpdate : Partial<IReview>) : Promise<IReview | null> {
  const updatedReview = await ReviewModel.findOneAndUpdate(
    { _id: id },
    toUpdate,
    { returnOriginal: false }
  );

  return updatedReview;
}

async function deleteReview(reviewId : string) : Promise<IReview | null> {
  const deletedReview = await ReviewModel.findOneAndDelete({ _id: reviewId });

  return deletedReview;
}

export { createReview, findUserReviews, findUserReview, updateReview, deleteReview };
