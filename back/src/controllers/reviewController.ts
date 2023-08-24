import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  addReview,
  getReview,
  getLoginReview,
  setReview,
  deletedReview,
} from "../services/reviewService";
import { handleFileUpload } from "../middlewares/uploadMiddleware";
import { IRequest } from "user";
import { FileRequest } from "upload";

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

    handleFileUpload(req as FileRequest,res,async function (error : any) {
      if (error){
        return next(error);
      }
      let uploadFile : string[] = [];

      if (Array.isArray(req.files)) {
        uploadFile = req.files.map(file => file.filename);
      } else if (req.files?.imageUrls) {
        uploadFile = req.files.imageUrls.map(file => file.filename);
      }

      const addMyReview = await addReview({
        toCreate: { ...req.body, author, userName, uploadFile},
      });

      return sendResponseWithData(res, StatusCodes.CREATED, addMyReview);
    })
  } catch (error) {
    next(error);
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

const getAllLogin = async (
  req : IRequest,
  res : Response,
  next : NextFunction
) => {
  try{
    const author = req.user._id;

    const loginReview = await getLoginReview(author);
    return sendResponseWithData(res, StatusCodes.OK, loginReview);
  }catch(err){
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

    handleFileUpload(req as FileRequest,res,async function (err : any){
      if (err){
        return next(err);
      }
      let uploadFile : string[] = [];

      if (Array.isArray(req.files)) {
        uploadFile = req.files.map(file => file.filename);
      } else if (req.files?.imageUrls) {
        uploadFile = req.files.imageUrls.map(file => file.filename);
      }
      const updatedReview = await setReview(id, {
        toUpdate: { ...req.body, uploadFile },
      });
  
      return sendResponseWithData(res, StatusCodes.OK, updatedReview);
    });
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

export { createReview, getAllReview, getAllLogin, updateReview, deleteReview };
