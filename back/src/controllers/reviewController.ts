import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  addReview,
  getReview,
  setReview,
  deletedReview,
} from "../services/reviewService";
import { IRequest } from "user";

const sendResponseWithData = function (res: Response, statusCode: number, data: any) {
  res.status(statusCode).json(data);
};

const createReview = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = req.user._id;
    const userName = req.user.name;

    console.log(req.body);
    
    const addMyReview = await addReview({
      toCreate: { ...req.body, author, userName},
    });

    return sendResponseWithData(res, StatusCodes.CREATED, addMyReview);
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
    return sendResponseWithData(res, StatusCodes.OK, allReview);
  } catch (err) {
    next(err);
  }
};

const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.reviewId;
    console.log(req.body);
    const updatedReview = await setReview(id, {
      toUpdate: { ...req.body },
    });

    return sendResponseWithData(res, StatusCodes.OK, updatedReview);
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
    return sendResponseWithData(res, StatusCodes.OK, deletReview);
  } catch (err) {
    next(err);
  }
};

export { createReview, getAllReview, updateReview, deleteReview };
