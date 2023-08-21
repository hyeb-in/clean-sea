"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.findUserReview = exports.findUserReviews = exports.createReview = void 0;
const reviewSchema_1 = require("../schemas/reviewSchema");
function createReview(toCreate) {
    return __awaiter(this, void 0, void 0, function* () {
        const newReview = yield reviewSchema_1.ReviewModel.create(toCreate);
        const newReviewObject = newReview.toObject();
        return newReviewObject;
    });
}
exports.createReview = createReview;
function findUserReviews(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userReviews = yield reviewSchema_1.ReviewModel.find({ author: userId });
        const userReviewsObjects = userReviews.map(review => review.toObject());
        return userReviewsObjects;
    });
}
exports.findUserReviews = findUserReviews;
function findUserReview(reviewId) {
    return __awaiter(this, void 0, void 0, function* () {
        const review = yield reviewSchema_1.ReviewModel.findOne({ _id: reviewId });
        if (review) {
            const reviewObject = review.toObject();
            return reviewObject;
        }
        return null;
    });
}
exports.findUserReview = findUserReview;
function updateReview(id, toUpdate) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedReview = yield reviewSchema_1.ReviewModel.findOneAndUpdate({ _id: id }, toUpdate, { returnOriginal: false });
        if (updatedReview) {
            const updatedReviewObject = updatedReview.toObject();
            return updatedReviewObject;
        }
        return null;
    });
}
exports.updateReview = updateReview;
function deleteReview(reviewId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedReview = yield reviewSchema_1.ReviewModel.findOneAndDelete({ _id: reviewId });
        if (deletedReview) {
            const deletedReviewObject = deletedReview.toObject();
            return deletedReviewObject;
        }
        return null;
    });
}
exports.deleteReview = deleteReview;
//# sourceMappingURL=Review.js.map