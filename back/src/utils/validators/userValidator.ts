import { NextFunction, Response } from "express";
import joi from "joi";
import { IRequest } from "user";
import { errorGenerator } from "../errorGenerator";

const nameReg: RegExp = /^[a-zA-Z가-힣]+$/;
const passwordReg: RegExp = /^[a-zA-Z0-9!@#;:'-_=+,./?]+$/;

export const validateSignUp = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const schema = joi.object({
    name: joi.string().min(5).max(20).required().pattern(nameReg),
    email: joi.string().min(5).max(30).required().email().messages({
      "string.min": "Email은 최소 5자 이하로 입력해주세요",
      "string.max": "Email은 30자 이하로 써주세요  ",
    }),
    password: joi.string().min(4).max(30).required().pattern(passwordReg),
  });

  const { value, error } = schema.validate({ name, email, password });

  if (error) {
    const err = errorGenerator(error.details[0].message, 400);
    next(err);
  }

  next();
};

export const validateLogin = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(4).max(30).required().pattern(passwordReg),
  });

  const { value, error } = schema.validate({ email, password });

  if (error) {
    const err = errorGenerator(error.details[0].message, 400);
    next(err);
  }

  next();
};

export const validateUpdateUser = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const updateValue = req.body;

  const schema = joi.object({
    name: joi.string().min(2).max(20).optional().pattern(nameReg),
    description: joi.string().optional(),
    profileImage: joi.string().optional(),
  });

  const { value, error } = schema.validate(updateValue);
  console.log(value);
  if (error) {
    const err = errorGenerator(error.details[0].message, 400);
    next(err);
  }
  next();
};
