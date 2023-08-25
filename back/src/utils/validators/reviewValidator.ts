import joi from "joi";
import { NextFunction, Response } from "express";
import { IRequest } from "user";
import { errorGenerator } from "../errorGenerator";

const validateSchema = (schema : joi.ObjectSchema) => {
    return (req : IRequest, res : Response , next : NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error){
            const errorMessage = error.details[0].message;
        const customError = errorGenerator(errorMessage, 400);
        return res.status(customError.statusCode).json({error:customError.message});
        }
    }
}

export const postReviewValidator = validateSchema (
    joi.object({
      title: joi.string().min(4).required().messages({
        'string.base': "문자여야합니다.",
        'string.min': '4글자이상이여야합니다.',
      }),
      content: joi.string().min(4).max(300).required().messages({
        'string.base': "문자여야합니다.",
        'string.min': '4글자이상이여야합니다.',
        'string.max': '300글자이하이여야합니다.',
      }),
      location: joi.any(),
    })
);
  

export const putReviewValidator = validateSchema (
    joi.object({
      title: joi.string().min(4).optional().messages({
        'string.base': "문자여야합니다.",
        'string.min': '4글자이상이여야합니다.',
      }),
      content: joi.string().min(4).max(300).optional().messages({
        'string.base': "문자여야합니다.",
        'string.min': '4글자이상이여야합니다.',
        'string.max': '300글자이하이여야합니다.',
      }),
      uploadFile: joi.any(),
      location: joi.any(),
    })
  );