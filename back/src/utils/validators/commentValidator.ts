import { NextFunction, Response } from "express";
import joi from "joi";
import { IRequest } from "user";

export const postCommentValidator = async (
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    const { content, date } = req.body;
    const schema = joi.object({
        content : joi.string().required(),
        date : joi.date().iso().required(),
    });
    const { value, error } = schema.validate({ content, date });

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
    const { content, date } = req.body;
    const schema = joi.object({
        content : joi.string().optional(),
        date : joi.date().iso().optional(),
    });
    const { value, error } = schema.validate({ content, date });

    if (error) {
    next(error.details[0].message);
    }

    next();
};