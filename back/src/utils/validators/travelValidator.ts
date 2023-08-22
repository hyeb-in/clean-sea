import { NextFunction, Response } from "express";
import joi from "joi";
import { IRequest } from "user";

export const postTravelValidator = async (
    req : IRequest,
    res : Response,
    next : NextFunction
) => {
    const { date } = req.body;
    const schema = joi.object({
        author : joi.required(),
        beachId: joi.required(),
        date : joi.date().iso().required(),
    });
    const { value, error } = schema.validate({ date });

    if (error) {
    next(error.details[0].message);
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
        beachId: joi.required(),
        date : joi.date().iso().required(),
    });
    const { value, error } = schema.validate({ date });

    if (error) {
    next(error.details[0].message);
    }

    next();
};

