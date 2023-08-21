import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  addReview,
  getReview,
  setReview,
  deletedReview,
} from "../services/reviewService";
import { ReviewValidator } from "../utils/validators/reviewValidator";
import { IRequest } from "user";
import { saveAndManageImage } from '../utils/uploads/uploadHelper';
// import fetch from 'node-fetch';

const sendResponseWithError = function (res: Response, statusCode: number, error: any) {
  res.status(statusCode).json({ error });
};

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
    // const schema = ReviewValidator.postReview();
    // const validationResult = schema.validate(req.body);

    // if (validationResult.error) {
    //   return sendResponseWithError(res, StatusCodes.BAD_REQUEST, validationResult.error.details[0].message);
    // }

    console.log(req.body);
    console.log(req.body.imageUrls);
    
      const { imageUrls } = req.body as { imageUrls : string[] };
      if(imageUrls){
        const imagePaths = await Promise.all(imageUrls.map(async (blobUrl) => {
          const imageResponse = await fetch(blobUrl);
          if (!imageResponse.ok) {
            throw new Error('Failed to fetch image');
          }
          const imageBuffer = await imageResponse.arrayBuffer();
          const imageBufferUint8 = new Uint8Array(imageBuffer);
    
        return saveAndManageImage(imageBufferUint8);
    
        }));
        const addMyReview = await addReview({
          toCreate: { ...req.body, author, userName, uploadFile : imagePaths },
        });
    
        return sendResponseWithData(res, StatusCodes.CREATED, addMyReview);
        
      }
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
    // const schema = ReviewValidator.putReview();
    // const validationResult = schema.validate(req.body);

    // if (validationResult.error) {
    //   return sendResponseWithError(res, StatusCodes.BAD_REQUEST, validationResult.error.details[0].message);
    // }
    console.log(req.body);
    console.log(req.body.imageUrls);
    const { imageUrls } =req.body as { imageUrls : string[] };
    if(imageUrls){
      const imagePaths = await Promise.all(imageUrls.map(async (blobUrl) => {
        console.log(blobUrl);
        const imageResponse = await fetch(blobUrl);
        console.log(imageResponse);
        if (!imageResponse.ok) {
          console.log(1111111111111111);
          throw new Error('Failed to fetch image');
        }
        const imageBuffer = await imageResponse.arrayBuffer();
        const imageBufferUint8 = new Uint8Array(imageBuffer);
    
        return saveAndManageImage(imageBufferUint8);
    
        }));
  
      const updatedReview = await setReview(id, {
        toUpdate: { ...req.body, uploadFile: imagePaths },
      });
  
      return sendResponseWithData(res, StatusCodes.OK, updatedReview);
    }
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
