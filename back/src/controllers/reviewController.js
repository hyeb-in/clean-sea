const { reviewAuthService } = require("../services/reviewService");
const { StatusCodes } = require("http-status-codes");
const { reviewValidator } = require("../utils/validators/reviewValidator");

const sendResponse = function (res, statusCode, data) {
  if (statusCode >= 400) {
  } else {
    res.status(statusCode).json(data);
  }
};

const createReview = async (req, res, next) => {
  try {
    const author = req.currentUserId;

    const schema = reviewValidator.postReview();
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return sendResponse(res, StatusCodes.BAD_REQUEST, {
        error: validationResult.error.details[0].message,
      });
    }
    const addMyReview = await reviewAuthService.addReview({
      toCreate: { ...req.body, author },
    });

    return sendResponse(res, StatusCodes.CREATED, addMyReview);
  } catch (err) {
    next(err);
  }
};

const getMyReview = async (req, res, next) => {
  try {
    const myReview = await reviewAuthService.getReview(req.currentUserId);

    return sendResponse(res, StatusCodes.OK, myReview);
  } catch (err) {
    next(err);
  }
};

const getUserReview = async (req, res, next) => {
  try {
    const userReview = await reviewAuthService.getReview(req.params.userId);

    return sendResponse(res, StatusCodes.OK, userReview);
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const id = req.params.reviewId;
    const schema = reviewValidator.putReview();
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return sendResponse(res, StatusCodes.BAD_REQUEST, {
        error: validationResult.error.details[0].message,
      });
    }
    const updatedReview = await reviewAuthService.setReview(id, {
      toUpdate: { ...req.body },
    });

    return sendResponse(res, StatusCodes.OK, updatedReview);
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const deletedReview = await reviewAuthService.deleteReview(
      req.params.reviewId
    );

    return sendResponse(res, StatusCodes.OK, deletedReview);
  } catch (err) {
    next(err);
  }
};

export { createReview, getMyReview, getUserReview, updateReview, deleteReview };
