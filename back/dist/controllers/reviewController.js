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
exports.deleteReview = exports.updateReview = exports.getUserReview = exports.getMyReview = exports.createReview = void 0;
const http_status_codes_1 = require("http-status-codes");
const reviewService_1 = require("../services/reviewService");
const reviewValidator_1 = require("../utils/validators/reviewValidator");
const sendResponse = function (res, statusCode, data) {
    if (statusCode >= 400) {
    }
    else {
        res.status(statusCode).json(data);
    }
};
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = req.user._id;
        const schema = reviewValidator_1.ReviewValidator.postReview();
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return sendResponse(res, http_status_codes_1.StatusCodes.BAD_REQUEST, {
                error: validationResult.error.details[0].message,
            });
        }
        // await handleImageUpload(req,res,()=>{});
        const addMyReview = yield (0, reviewService_1.addReview)({
            toCreate: Object.assign(Object.assign({}, req.body), { author }),
        });
        return sendResponse(res, http_status_codes_1.StatusCodes.CREATED, addMyReview);
    }
    catch (err) {
        next(err);
    }
});
exports.createReview = createReview;
const getMyReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myReview = yield (0, reviewService_1.getReview)(req.user._id);
        return sendResponse(res, http_status_codes_1.StatusCodes.OK, myReview);
    }
    catch (err) {
        next(err);
    }
});
exports.getMyReview = getMyReview;
const getUserReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userReview = yield (0, reviewService_1.getReview)(req.params.userId);
        return sendResponse(res, http_status_codes_1.StatusCodes.OK, userReview);
    }
    catch (err) {
        next(err);
    }
});
exports.getUserReview = getUserReview;
const updateReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.reviewId;
        const schema = reviewValidator_1.ReviewValidator.putReview();
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return sendResponse(res, http_status_codes_1.StatusCodes.BAD_REQUEST, {
                error: validationResult.error.details[0].message,
            });
        }
        // await handleFileUpload(req,res,() => {});
        const updatedReview = yield (0, reviewService_1.setReview)(id, {
            toUpdate: Object.assign({}, req.body),
        });
        return sendResponse(res, http_status_codes_1.StatusCodes.OK, updatedReview);
    }
    catch (err) {
        next(err);
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletReview = yield (0, reviewService_1.deletedReview)(req.params.reviewId);
        return sendResponse(res, http_status_codes_1.StatusCodes.OK, deletReview);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteReview = deleteReview;
//# sourceMappingURL=reviewController.js.map