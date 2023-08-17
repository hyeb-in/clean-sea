import { Request, Response, NextFunction } from 'express';
import { getBeachByBeachNameService, getBeachByRegionService, getBeachesService } from "../services/beachService";

interface IBeach {
  id: number;
  name: string;
  address: string;
  goodnessFit?: boolean;
  eschScore?: number,
  enteScore?: number,
  ente?: number;
  esch?: number;
  latitude?: number;
  longitude?: number;
}


const getBeachByBeachName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.name;

    const result = await getBeachByBeachNameService({ name } as IBeach); // IBeach 형태로 변환
    // logger.info("getBeaches");
    res.status(200).json(result);
  } catch (e) {
    // logger.error(e);
    next(e);
  }
};

const getBeachByRegion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const address = req.params.address;

    const result = await getBeachByRegionService({ address } as IBeach); // IBeach 형태로 변환
    // logger.info("getBeaches");
    res.status(200).json(result);
  } catch (e) {
    // logger.error(e);
    next(e);
  }
};

const getBeaches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getBeachesService();
    // logger.info("getBeaches");
    res.status(200).json(result);
  } catch (e) {
    // logger.error(e);
    next(e);
  }
};

export const beachController = {
  getBeachByBeachName,
  getBeachByRegion,
  getBeaches,
};
