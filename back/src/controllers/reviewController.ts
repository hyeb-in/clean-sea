import { Request, Response, NextFunction } from "express";
import {
  addReview,
  getReview,
  getLoginReview,
  setReview,
  deletedReview,
} from "../services/reviewService";
import { IRequest } from "user";

const createReview = async (req: IRequest, res: Response, next : NextFunction) => {
  try {
    const author = req.user._id;
    const userName = req.user.name;

    const addMyReview = await addReview({
      toCreate: { ...req.body, author, userName },
    });

    res.status(200).json(addMyReview);
  } catch (error) {
    next(error);
  }
};

const getAllReview = async (req: IRequest, res: Response, next : NextFunction) => {
  try {
    const allReview = await getReview();
    res.status(200).json(allReview);
  } catch (error) {
    next(error);
  }
};

const getAllLogin = async (req: IRequest, res: Response, next : NextFunction) => {
  try {
    const author = req.user._id;

    const loginReview = await getLoginReview(author);
    res.status(200).json(loginReview);
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
    console.log(updateReview);
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const deletReview = await deletedReview(req.params.reviewId);
    res.status(200).json(deletReview);
  } catch (error) {
    next(error);
  }
};

export { createReview, getAllReview, getAllLogin, updateReview, deleteReview };
