import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  addReview,
  getReview,
  setReview,
  deletedReview,
} from "../services/reviewService";
import { ReviewValidator } from "../utils/validators/reviewValidator";
// import { handleFileUpload } from '../middlewares/uploadMiddleware';
import { IRequest } from "user";

const sendResponse = function (res: Response, statusCode: number, data: any) {
  if (statusCode >= 400) {
  } else {
    res.status(statusCode).json(data);
  }
};

const createReview = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = req.user._id;
    console.log(req.user.name);
    const userName = req.user.name;

    const schema = ReviewValidator.postReview();
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return sendResponse(res, StatusCodes.BAD_REQUEST, {
        error: validationResult.error.details[0].message,
      });
    }
    // await handleImageUpload(req,res,()=>{});

    const addMyReview = await addReview({
      toCreate: { ...req.body, author, userName },
    });

    return sendResponse(res, StatusCodes.CREATED, addMyReview);
  } catch (err) {
    next(err);
  }
};

const getAllReview = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const allReview = await getReview();
    return sendResponse(res, StatusCodes.OK, allReview);
  } catch (err) {
    next(err);
  }
};

// const getUserReview = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userReview = await getReview(req.params.userId);

//     return sendResponse(res, StatusCodes.OK, userReview);
//   } catch (err) {
//     next(err);
//   }
// };

const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.reviewId;

    const schema = ReviewValidator.putReview();
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return sendResponse(res, StatusCodes.BAD_REQUEST, {
        error: validationResult.error.details[0].message,
      });
    }
    // await handleFileUpload(req,res,() => {});

    const updatedReview = await setReview(id, {
      toUpdate: { ...req.body },
    });

    return sendResponse(res, StatusCodes.OK, updatedReview);
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletReview = await deletedReview(req.params.reviewId);

    return sendResponse(res, StatusCodes.OK, deletReview);
  } catch (err) {
    next(err);
  }
};

export { createReview, getAllReview, updateReview, deleteReview };
