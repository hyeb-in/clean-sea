import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ReviewAuthService } from '../services/reviewService';
import { ReviewValidator } from '../utils/validators/reviewValidator';
// import { handleImageUpload } from '../middlewares/uploadMiddleware';


const sendResponse = function (res : Response, statusCode : number, data : any) {
  if (statusCode >= 400) {
  } else {
    res.status(statusCode).json(data);
  }
};

const createReview = async (req : Request, res : Response, next : NextFunction) => {
  try {
    // const author = req.currentUserId;
    const schema = ReviewValidator.postReview();
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return sendResponse(res, StatusCodes.BAD_REQUEST, {
        error: validationResult.error.details[0].message,
      });
    }
    // await handleImageUpload(req,res,()=>{});

    const addMyReview = await ReviewAuthService.addReview({
      // toCreate: { ...req.body, author },
      toCreate: { ...req.body},
    });

    return sendResponse(res, StatusCodes.CREATED, addMyReview);
  } catch (err) {
    next(err);
  }
};

const getMyReview = async (req : Request, res : Response, next : NextFunction) => {
  try {
    // const myReview = await ReviewAuthService.getReview(req.currentUserId);

    // return sendResponse(res, StatusCodes.OK, myReview);
  } catch (err) {
    next(err);
  }
};

const getUserReview = async (req : Request, res : Response, next : NextFunction) => {
  try {
    const userReview = await ReviewAuthService.getReview(req.params.userId);

    return sendResponse(res, StatusCodes.OK, userReview);
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req : Request, res : Response, next : NextFunction) => {
  try {
    const id = req.params.reviewId;
    const schema = ReviewValidator.putReview();
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return sendResponse(res, StatusCodes.BAD_REQUEST, {
        error: validationResult.error.details[0].message,
      });
    }
    const updatedReview = await ReviewAuthService.setReview(id, {
      toUpdate: { ...req.body },
    });

    return sendResponse(res, StatusCodes.OK, updatedReview);
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req : Request, res : Response, next : NextFunction) => {
  try {
    const deletedReview = await ReviewAuthService.deleteReview(
      req.params.reviewId
    );

    return sendResponse(res, StatusCodes.OK, deletedReview);
  } catch (err) {
    next(err);
  }
};

export { createReview, getMyReview, getUserReview, updateReview, deleteReview };
