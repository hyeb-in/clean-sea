import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  addTravel,
  getTravel,
  setTravel,
  deletedTravel,
} from "../services/travelService";
import { IRequest } from "user";
import { errorGenerator } from "../utils/errorGenerator";

const sendResponse = function (res: Response, statusCode: number, data: any) {
  if (statusCode >= 400) {
  } else {
    res.status(statusCode).json(data);
  }
};

const createTravel = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = req.user._id;

    const addMyTravel = await addTravel({
      toCreate: { ...req.body, author },
    });

    return sendResponse(res, StatusCodes.CREATED, addMyTravel);
  } catch (error) {
    const customError = errorGenerator(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(customError.statusCode).json({ error: customError.message });
  }
};

const getMyTravel = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const myTravel = await getTravel(req.user._id);
    return sendResponse(res, StatusCodes.CREATED, myTravel);
  } catch (err) {
    const customError = errorGenerator("Failed to retrieve travels", StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(customError.statusCode).json({ error: customError.message });
  }
};

const getUserTravel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userTravel = await getTravel(req.params.userId);

    return sendResponse(res, StatusCodes.CREATED, userTravel);
  } catch (err) {
    const customError = errorGenerator("Failed to retrieve user travels", StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(customError.statusCode).json({ error: customError.message });
  }
};

const updateTravel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.travelId;
    
    const updatedTravel = await setTravel(id, {
      toUpdate: { ...req.body },
    });

    return sendResponse(res, StatusCodes.CREATED, updatedTravel);
  } catch (err) {
    const customError = errorGenerator("Failed to update travels", StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(customError.statusCode).json({ error: customError.message });
  }
};

const deleteTravel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteTravel = await deletedTravel(req.params.travelId);

    return sendResponse(res, StatusCodes.CREATED, deleteTravel);
  } catch (err) {
    const customError = errorGenerator("Failed to delete travels", StatusCodes.INTERNAL_SERVER_ERROR);
    return res.status(customError.statusCode).json({ error: customError.message });
  }
};

export { createTravel, getMyTravel, getUserTravel, updateTravel, deleteTravel };
