import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  addReview,
  getReview,
  getLoginReview,
  setReview,
  deletedReview,
} from "../services/reviewService";
import { IRequest } from "user";

const sendResponseWithData = function (
  res: Response,
  statusCode: number,
  data: any
) {
  res.status(statusCode).json(data);
};

const createReview = async (req: IRequest, res: Response, next : NextFunction) => {
  try {
    const author = req.user._id;
    const userName = req.user.name;

    const addMyReview = await addReview({
      toCreate: { ...req.body, author, userName },
    });

    return sendResponseWithData(res, StatusCodes.CREATED, addMyReview);
  } catch (error) {
    next(error);
  }
};

const getAllReview = async (req: IRequest, res: Response, next : NextFunction) => {
  try {
    const allReview = await getReview();
    return sendResponseWithData(res, StatusCodes.CREATED, allReview);
  } catch (error) {
    next(error);
  }
};

const getAllLogin = async (req: IRequest, res: Response, next : NextFunction) => {
  try {
    const author = req.user._id;

    const loginReview = await getLoginReview(author);
    return sendResponseWithData(res, StatusCodes.CREATED, loginReview);
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req: IRequest, res: Response, next : NextFunction) => {
  try {
    const id = req.params.reviewId;

    const updatedReview = await setReview(id, {
      toUpdate: { ...req.body },
    });

    return sendResponseWithData(res, StatusCodes.CREATED, updatedReview);
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const deletReview = await deletedReview(req.params.reviewId);
    return sendResponseWithData(res, StatusCodes.CREATED, deletReview);
  } catch (error) {
    next(error);
  }
};

export { createReview, getAllReview, getAllLogin, updateReview, deleteReview };
