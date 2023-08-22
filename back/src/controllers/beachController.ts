import { Request, Response, NextFunction } from 'express';
import { getBeachByBeachNameService, getBeachByRegionService, getBeachesService } from "../services/beachService";
import { StatusCodes } from "http-status-codes";
import { IBeach } from '../types/beach';

const getBeachByBeachName = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const name = req.params.name;

    const result = await getBeachByBeachNameService({ name } as IBeach);
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
    const address = req.params.address;

    const result = await getBeachByRegionService({ address } as IBeach);
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

export { getBeachByBeachName, getBeachByRegion, getBeaches };
