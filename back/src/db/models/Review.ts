import { ReviewModel } from '../schemas/reviewSchema';
import { IReview } from '../../interfaces/review';

class Review {
  static async create(toCreate : IReview) : Promise<IReview> {
    const newReview = await ReviewModel.create(toCreate);

    return newReview;
  }

  static async findUser(userId: string): Promise<IReview[]> {
    const user = await ReviewModel.find({ author: userId });

    return user;
  }

  static async findReview(reviewId : string): Promise<IReview | null> {
    const review = await ReviewModel.findOne({ _id: reviewId });

    return review;
  }

  static async update(id : string, toUpdate : Partial<IReview>) : Promise<IReview | null> {
    const updateReview = await ReviewModel.findOneAndUpdate(
      { _id: id },
      toUpdate,
      { returnOriginal: false }
    );

    return updateReview;
  }

  static async delete(reviewId : string) : Promise<IReview | null> {
    const deleteReview = await ReviewModel.findOneAndDelete({ _id: reviewId });

    return deleteReview;
  }
}

export { Review };
