import { NextFunction, Response } from "express";
import joi from "joi";
import { IRequest } from "user";
import { errorGenerator } from "../errorGenerator";

export const postTravelValidator = async (
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    const { date } = req.body;
    const schema = joi.object({
        date : joi.date().iso().required(),
    });
    const { error } = schema.validate({ date });

    if (error) {
        const errorMessage = error.details[0].message;
        const customError = errorGenerator(errorMessage, 400);
        return res.status(customError.statusCode).json({error:customError.message});
    }

    next();
};

export const putTravelValidator = async (
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    const { date } = req.body;
    const schema = joi.object({
        date : joi.date().iso().required(),
    });
    const { error } = schema.validate({ date });

    if (error) {
        const errorMessage = error.details[0].message;
        const customError = errorGenerator(errorMessage, 400);
        return res.status(customError.statusCode).json({error:customError.message});
    }

    next();
};

