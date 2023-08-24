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
import { errorGenerator } from "../utils/errorGenerator";
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
    const customError = errorGenerator(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(customError.statusCode).json({ error: customError.message });
  }
};

const getAllReview = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const allReview = await getReview();
    return sendResponseWithData(res, StatusCodes.CREATED, allReview);
  } catch (err) {
    const customError = errorGenerator("Failed to retrieve reviews", StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(customError.statusCode).json({ error: customError.message });
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
    return sendResponseWithData(res, StatusCodes.CREATED, loginReview);
  }catch(err){
    const customError = errorGenerator("Failed to retrieve login reviews", StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(customError.statusCode).json({ error: customError.message });
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
  
      return sendResponseWithData(res, StatusCodes.CREATED, updatedReview);
    });
  } catch (err) {
    const customError = errorGenerator("Failed to update login reviews", StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(customError.statusCode).json({ error: customError.message });
  }
};

const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletReview = await deletedReview(req.params.reviewId);
    return sendResponseWithData(res, StatusCodes.CREATED, deletReview);
  } catch (err) {
    const customError = errorGenerator("Failed to delete login reviews", StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(customError.statusCode).json({ error: customError.message });
  }
};

export { createReview, getAllReview, getAllLogin, updateReview, deleteReview };
