import { Request, Response, NextFunction } from 'express';
import { getBeachByIdService, getBeachByRegionService, getBeachesService } from "../services/beachService";
import { StatusCodes } from "http-status-codes";
import { IBeach } from '../types/beach';
import { Types } from "mongoose";

const getBeachById = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const _id = new Types.ObjectId(req.params._id); // _id 파라미터를 ObjectId로 변환

    const result = await getBeachByIdService(_id); // _id 값을 직접 전달
    res.status(StatusCodes.OK).json(result);
  } catch (e) {
    next(e);
  }
};


const getBeachByRegion = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const address = req.params.address; // 주소 파라미터를 받아옴
    console.log(address)
    const result = await getBeachByRegionService(address); // 주소 값을 직접 전달
    console.log(result)
    res.status(StatusCodes.OK).json(result);
  } catch (e) {
    next(e);
  }
};

const getBeaches = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const result = await getBeachesService();
    res.status(StatusCodes.OK).json(result);
  } catch (e) {
    next(e);
  }
};

export { getBeachById, getBeachByRegion, getBeaches };
