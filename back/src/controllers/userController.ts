import { NextFunction, Response } from "express";
import { createUser } from "../services/userService";
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
      return res.status(400).send({ message: "모든 사항을 입력하세요" });
    }

    const newUser = await createUser(name, email, password);

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUserInfo = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  const {} = req.body;
};
export const deleteUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {};
