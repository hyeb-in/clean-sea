import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addTravel, getTravel, setTravel, deletedTravel } from '../services/travelService';
import { TravelValidator } from '../utils/validators/travelValidator';
import { RequestTest } from "user";

const sendResponse = function (res : Response, statusCode : number, data : any) {
    if (statusCode >= 400) {
    } else {
      res.status(statusCode).json(data);
    }
};

const createTravel = async (req : RequestTest, res : Response, next : NextFunction) => {
    try {
      const author = req.user._id;
  
      const schema = TravelValidator.postTravel();
      const validationResult = schema.validate(req.body);
      if (validationResult.error) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, {
          error: validationResult.error.details[0].message,
        });
      }
  
      const addMyTravel = await addTravel({
        toCreate: { ...req.body, author },
      });
  
      return sendResponse(res, StatusCodes.CREATED, addMyTravel);
    } catch (err) {
      next(err);
    }
  };

  const getMyTravel = async (req : RequestTest, res : Response, next : NextFunction) => {
    try {
      const myTravel = await getTravel(req.user._id);
      return sendResponse(res, StatusCodes.OK, myTravel);
    } catch (err) {
      next(err);
    }
  };

  const getUserTravel = async (req : Request, res : Response, next : NextFunction) => {
    try {
      const userTravel = await getTravel(req.params.userId);
  
      return sendResponse(res, StatusCodes.OK, userTravel);
    } catch (err) {
      next(err);
    }
  };

  const updateTravel = async (req : Request, res : Response, next : NextFunction) => {
    try {
      const id = req.params.travelId;
      const schema = TravelValidator.putTravel();
      const validationResult = schema.validate(req.body);
  
      if (validationResult.error) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, {
          error: validationResult.error.details[0].message,
        });
      }
      const updatedTravel = await setTravel(id, {
        toUpdate: { ...req.body },
      });
  
      return sendResponse(res, StatusCodes.OK, updatedTravel);
    } catch (err) {
      next(err);
    }
  };

  const deleteTravel = async (req : Request, res : Response, next : NextFunction) => {
    try {
      const deleteTravel = await deletedTravel(
        req.params.travelId
      );
  
      return sendResponse(res, StatusCodes.OK, deleteTravel);
    } catch (err) {
      next(err);
    }
  };

  export { createTravel, getMyTravel, getUserTravel, updateTravel, deleteTravel };