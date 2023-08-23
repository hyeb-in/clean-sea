import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const validateBeachId = () => {
  const schema = joi.object({
    _id: joi.string().required(),
  });

  return (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
    const { error } = schema.validate(req.params);
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
    } else {
      next();
    }
  };
};

const validateBeachAddress = () => {
  const schema = joi.object({
    address: joi.string().required(),
  });

  return (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
    const { error } = schema.validate(req.params);
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
    } else {
      next();
    }
  };
};

const validateBeachYear = () => {
  const schema = joi.object({
    address: joi.string().required(),
  });

  return (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
    const { error } = schema.validate(req.params);
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error.details[0].message);
    } else {
      next();
    }
  };
};

export { 
  validateBeachYear,
  validateBeachId, 
  validateBeachAddress };
