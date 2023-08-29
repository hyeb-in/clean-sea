import joi from "joi";
import { NextFunction, Response } from "express";
import { IRequest } from "user";
import { errorGenerator } from "../errorGenerator";

export const commonStringValidation = joi.string().min(2).messages({
  'string.base': "글자를 확인해주세요.",
  'string.min': '2글자 이상 작성해주세요.',
});

export const commonNumberValidation = joi.number().min(4).messages({
  'number.base': "숫자로 입력해주세요.",
  'number.min': '1999 형태로 작성해주세요',
});

class beachValidator {
  static validateSchema(schema: joi.Schema) {
    return (req: IRequest, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        const errorMessage = error.details[0].message;
        const customError = errorGenerator(errorMessage, 400);
        return res.status(customError.statusCode).json({ error: customError.message });
      }
      next();
    };
  }

  static getBeachById() {
    const schema = joi.object({
      _id: commonStringValidation.required(),
    });
    return this.validateSchema(schema);
  }

  static getBeachByName() {
    const schema = joi.object({
      name: commonStringValidation.required(),
    });
    return this.validateSchema(schema);
  }

  static getBeachByRegionAndYear() {
    const schema = joi.object({
      year: commonNumberValidation.optional(),
      address: commonStringValidation.optional(),
    });
    return this.validateSchema(schema);
  }

  static getBeachByRegionAndYearSpecificAvg() {
    const schema = joi.object({
      year: commonNumberValidation.optional(),
    });
    return this.validateSchema(schema);
  }

  static getBeachByRegionAndYearSpecific() {
    const schema = joi.object({
      year: commonNumberValidation.optional(),
    });
    return this.validateSchema(schema);
  }
}

export { beachValidator };