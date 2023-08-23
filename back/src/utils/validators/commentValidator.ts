import { NextFunction, Response } from "express";
import joi from "joi";
import { IRequest } from "user";

export const postCommentValidator = async (
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    const { content } = req.body;
    const schema = joi.object({
        content : joi.string().min(1).max(100).required().messages({
            'string.base' : "문자여야합니다.",
            'string.min' : '1글자이상이여야합니다.',
            'string.max' : '100글자이하이여야합니다.',
        }),
    });
    const { value, error } = schema.validate({ content });

    if (error) {
    next(error.details[0].message);
    }

    next();
};

export const putCommentValidator = async (
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    const { content } = req.body;
    const schema = joi.object({
        content : joi.string().min(1).max(100).optional().messages({
            'string.base' : "문자여야합니다.",
            'string.min' : '1글자이상이여야합니다.',
            'string.max' : '100글자이하이여야합니다.',
        }),
    });
    const { value, error } = schema.validate({ content });

    if (error) {
    next(error.details[0].message);
    }

    next();
};