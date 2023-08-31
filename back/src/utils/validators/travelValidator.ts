import joi from "joi";
import { NextFunction, Response } from "express";
import { IRequest } from "user";
import { errorGenerator } from "../errorGenerator";

const errorMessage = {
    invalidDate : "날짜형식에 맞춰 입력해야합니다.",
};

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

const posttravelSchema = joi.object({
    beachId: joi.required(),
    date : joi.date().iso().required().messages(errorMessage),
});

const puttravelSchema = joi.object({
    beachId: joi.required(),
    date : joi.date().iso().optional().messages(errorMessage),
});

export const postTravelValidator = validateSchema (posttravelSchema);

export const putTravelValidator = validateSchema (puttravelSchema);

