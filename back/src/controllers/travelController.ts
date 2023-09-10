import { Request, Response, NextFunction } from "express";
import {
  addTravel,
  getTravel,
  setTravel,
  deletedTravel,
} from "../services/travelService";
import { IRequest } from "user";

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

    res.status(200).json(addMyTravel);
  } catch (error) {
    next(error);
  }
};

const getMyTravel = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const myTravel = await getTravel(req.user._id);
    res.status(200).json(myTravel);
  } catch (error) {
    next(error);
  }
};

const getUserTravel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userTravel = await getTravel(req.params.userId);

    res.status(200).json(userTravel);
  } catch (error) {
    next(error);
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

    res.status(200).json(updatedTravel);
  } catch (error) {
    next(error);
  }
};

const deleteTravel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteTravel = await deletedTravel(req.params.travelId);

    res.status(200).json(deleteTravel);
  } catch (error) {
    next(error);
  }
};

export { createTravel, getMyTravel, getUserTravel, updateTravel, deleteTravel };
