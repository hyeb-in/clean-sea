import { NextFunction, Response } from "express";
import joi from "joi";
import { IRequest } from "user";
import { errorGenerator } from "../errorGenerator";

export const postReviewValidator = async (
    req : IRequest,
    res : Response,
    next : NextFunction
)=>{
    const { title, content, imageUrls, location } = req.body;
    const schema = joi.object({
        title : joi.string().min(4).required().messages({
            'string.base' : "문자여야합니다.",
            'string.min' : '4글자이상이여야합니다.',
        }),
        content : joi.string().min(4).max(300).required().messages({
            'string.base' : "문자여야합니다.",
            'string.min' : '4글자이상이여야합니다.',
            'string.max' : '300글자이하이여야합니다.',
        }),
        imageUrls: joi.any(),
        location : joi.any(),
    });

    const { error } = schema.validate({ title, content, imageUrls, location });
    if (error) {
        const errorMessage = error.details[0].message;
        const customError = errorGenerator(errorMessage, 400);
        return res.status(customError.statusCode).json({error:customError.message});
    }

    next();
}

export const putReviewValidator = async (
    req : IRequest,
    res : Response,
    next : NextFunction
)=>{
    const { title, content } = req.body;
    const schema = joi.object({
        title : joi.string().min(4).optional().messages({
            'string.base' : "문자여야합니다.",
            'string.min' : '4글자이상이여야합니다.',
        }),
        content : joi.string().min(4).max(300).optional().messages({
            'string.base' : "문자여야합니다.",
            'string.min' : '4글자이상이여야합니다.',
            'string.max' : '300글자이하이여야합니다.',
        }),
    });

    const { error } = schema.validate({ title, content });

    if (error) {
        const errorMessage = error.details[0].message;
        const customError = errorGenerator(errorMessage, 400);
        return res.status(customError.statusCode).json({error:customError.message});
    }

    next();
}