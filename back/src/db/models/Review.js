const { ReviewModel } = require("../schemas/review");

class Review {
  static async create(toCreate) {
    const newReview = await ReviewModel.create(toCreate);

    return newReview;
  }

  static async findUser(userId) {
    const user = await ReviewModel.find({ author: userId });

    return user;
  }

  static async findReview(reviewId) {
    const review = await ReviewModel.findOne({ _id: reviewId });

    return review;
  }

  static async update(id, toUpdate) {
    const updateReview = await ReviewModel.findOneAndUpdate(
      { _id: id },
      toUpdate,
      { returnOriginal: false }
    );

    return updateReview;
  }

  static async delete(reviewId) {
    const deleteReview = await ReviewModel.findOneAndDelete({ _id: reviewId });

    return deleteReview;
  }
}

module.exports = { Review };
