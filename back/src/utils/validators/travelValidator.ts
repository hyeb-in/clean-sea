import joi from "joi";
import { NextFunction, Response } from "express";
import { IRequest } from "user";
import { errorGenerator } from "../errorGenerator";

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

const travelSchema = joi.object({
    beachId: joi.required().required(),
    date : joi.date().iso().required()
});

export const postTravelValidator = validateSchema (travelSchema);

export const putTravelValidator = validateSchema (travelSchema, true);

