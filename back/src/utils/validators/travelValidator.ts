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

export const postTravelValidator = validateSchema (
    joi.object({
        date : joi.date().iso().required(),
    }),
);


export const putTravelValidator = validateSchema (
    joi.object({
        date : joi.date().iso().optional(),
    }),
);

