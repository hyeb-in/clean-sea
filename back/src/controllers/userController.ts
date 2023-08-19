import { NextFunction, Response } from "express";
import {
  createUserService,
  deleteUserService,
  updateUserService,
} from "../services/userService";
import { IRequest } from "user";

/**
 * @param {*} req name,email,password
 * @description 회원가입 api
 */
export const signUpUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      //ErrorGenerate 만들기
      throw new Error("항목을 빠짐없이 입력해주세요");
    }

    const newUser = await createUserService(name, email, password);

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const inputData = req.body;

    const updatedUser = await updateUserService(userId, inputData);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await deleteUserService(userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
