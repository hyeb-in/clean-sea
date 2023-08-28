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
        next();
    }
}


export const postCommentValidator = validateSchema (
    joi.object({
        content : joi.string().min(1).max(100).required().messages({
            'string.base' : "문자여야합니다.",
            'string.min' : '1글자이상이여야합니다.',
            'string.max' : '100글자이하이여야합니다.',
        }),
    })
);

export const putCommentValidator = validateSchema (
    joi.object({
        content : joi.string().min(1).max(100).optional().messages({
            'string.base' : "문자여야합니다.",
            'string.min' : '1글자이상이여야합니다.',
            'string.max' : '100글자이하이여야합니다.',
        }),
    })
);