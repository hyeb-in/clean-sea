import joi, { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const beachNameValidator = (): Schema => {
  return joi.object({
    name: joi.string().required(),
  });
};

export const addressNameValidator = (): Schema => {
  return joi.object({
    address: joi.string().required(),
  });
};

function validate(schema: Schema) {
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
}

export { validate };