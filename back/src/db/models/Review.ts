import { ReviewModel } from '../schemas/reviewSchema';
import { IReview } from '../../types/review';
const mongoose = require('mongoose');

async function createReview(toCreate: IReview): Promise<IReview> {
  const newReview = await ReviewModel.create(toCreate);
  const newReviewObject = newReview.toObject();
  return newReviewObject as IReview;
}

async function findAllReviews(): Promise<IReview[]> {
  const userReviews = await ReviewModel.find()
      .populate({
        path : 'comments',
        options : { sort : { createdAt : -1}, limit : 3}
      })
      .sort({createdAt : -1})
      .exec();
  const userReviewsObjects = userReviews.map(review => review.toObject());
  return userReviewsObjects as IReview[];
}

async function findUserReviews(author:string): Promise<IReview[]>{
  const userReviews = await ReviewModel.find()
      .populate({
        path : 'comments',
        options : { sort : { createdAt : -1}, limit : 3}
      })
      .sort({createdAt : -1})
      .exec();

    const authorString = author.toString();
    console.log(authorString);
    const userReviewsObjects = userReviews.map(review =>{
      const isLike = review.Likes.some(like=>like.userId === authorString && like.isLike === 'yes');
      const reviewObject = review.toObject() as IReview;
      if (isLike) {
        reviewObject.isLike = 'yes';
      }else{
        reviewObject.isLike = 'no';
      }
      return reviewObject;
    });
  return userReviewsObjects;
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

export { createReview, findAllReviews, findUserReviews, findUserReview, updateReview, deleteReview };
