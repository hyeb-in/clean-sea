import { NextFunction, Response } from "express";
import joi from "joi";
import { IRequest } from "user";
import { errorGenerator } from "../errorGenerator";

export const postTravelValidator = async (
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    const { author, beachId, date } = req.body;
    const schema = joi.object({
        author : joi.required(),
        beachId: joi.required(),
        date : joi.date().iso().required(),
    });
    const { error } = schema.validate({ author, beachId, date });

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
    const { beachId, date } = req.body;
    const schema = joi.object({
        beachId: joi.required(),
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

