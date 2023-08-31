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

export const beachParamsValidator = validateSchema(
  joi.object({
    year: joi.string().required(),
  }),
  'params'
);

export const commonParamValidator = (paramName: string) => {
  return validateSchema(
    joi.object({
      [paramName]: joi.string().required(),
    }),
    'params'
  );
};