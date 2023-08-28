import joi from "joi";
import { NextFunction, Response } from "express";
import { IRequest } from "user";
import { errorGenerator } from "../errorGenerator";

const errorMessage = {
    stringBase : "문자여야합니다.",
    stringMin : '1글자이상이여야합니다.',
    stringMax : '100글자이하이여야합니다.',
}

const validateSchema = (schema : joi.ObjectSchema, optional = false) => {
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

const commentSchema = joi.object({
    content : joi.string().min(1).max(100).messages(errorMessage),
})

export const postCommentValidator = validateSchema (commentSchema);

export const putCommentValidator = validateSchema (commentSchema, true);