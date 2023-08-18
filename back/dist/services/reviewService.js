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
exports.deletedReview = exports.setReview = exports.getReview = exports.addReview = void 0;
const Review_1 = require("../db/models/Review");
function addReview({ toCreate }) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdReview = yield (0, Review_1.createReview)(toCreate);
        return createdReview;
    });
}
exports.addReview = addReview;
function getReview(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const review = yield (0, Review_1.findUserReviews)(userId);
        return review;
    });
}
exports.getReview = getReview;
function setReview(reviewId, { toUpdate }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Review_1.findUserReview)(reviewId);
        const updatedReview = (0, Review_1.updateReview)(reviewId, toUpdate);
        return updatedReview;
    });
}
exports.setReview = setReview;
function deletedReview(reviewId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedReview = yield (0, Review_1.deleteReview)(reviewId);
        return deletedReview;
    });
}
exports.deletedReview = deletedReview;
//# sourceMappingURL=reviewService.js.map