import { ReviewModel } from '../schemas/reviewSchema';
import { IReview } from '../../types/review';

async function createReview(toCreate: IReview): Promise<IReview> {
  const newReview = await ReviewModel.create(toCreate);
  const newReviewObject = newReview.toObject();
  return newReviewObject as IReview;
}

async function findUserReviews(userId: string): Promise<IReview[]> {
  const userReviews = await ReviewModel.find({ author: userId });
  const userReviewsObjects = userReviews.map(review => review.toObject());
  return userReviewsObjects as IReview[];
}

async function findUserReview(reviewId: string): Promise<IReview | null> {
  const review = await ReviewModel.findOne({ _id: reviewId });
  if (review) {
    const reviewObject = review.toObject();
    return reviewObject as IReview;
  }
  return null;
}

async function updateReview(id: string, toUpdate: Partial<IReview>): Promise<IReview | null> {
  const updatedReview = await ReviewModel.findOneAndUpdate(
    { _id: id },
    toUpdate,
    { returnOriginal: false }
  );
  if (updatedReview) {
    const updatedReviewObject = updatedReview.toObject();
    return updatedReviewObject as IReview;
  }
  return null;
}

async function deleteReview(reviewId: string): Promise<IReview | null> {
  const deletedReview = await ReviewModel.findOneAndDelete({ _id: reviewId });

  if (deletedReview) {
    const deletedReviewObject = deletedReview.toObject();
    return deletedReviewObject as IReview;
  }
  return null;
}

export { createReview, findUserReviews, findUserReview, updateReview, deleteReview };
