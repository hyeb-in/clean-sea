import joi from "joi";
import { NextFunction, Response } from "express";
import { IRequest } from "user";
import { errorGenerator } from "../errorGenerator";

const validateSchema = (schema : joi.ObjectSchema, location : 'body' | 'params' | 'query') => {
  return (req : IRequest, res : Response , next : NextFunction) => {
    const { error } = schema.validate(req[location]);
    if (error){
      const errorMessage = error.details[0].message;
      const customError = errorGenerator(errorMessage, 400);
      return res.status(customError.statusCode).json({error: customError.message});
    }
    next();
  };
};

export const yearAddressParamsValidator = validateSchema(
  joi.object({
    year: joi.string().required(),
    address: joi.string().required(),
  }),
  'params'
);

export const beachParamsValidator = validateSchema(
  joi.object({
    year: joi.string().required(),
  }),
  'params'
);

export const nameParamValidator = validateSchema(
  joi.object({
    name: joi.string().required(),
  }),
  'params'
);

export const idParamValidator = validateSchema(
  joi.object({
    _id: joi.string().required(),
  }),
  'params'
);