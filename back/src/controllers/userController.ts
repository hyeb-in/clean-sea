import { NextFunction, Request, Response } from "express";
import { createUser } from "../services/userService";
import { RequestTest } from "user";
/**
 * @param {*} req name,email,password
 * @description 회원가입 api
 */
export const signUpUser = async (
  req: RequestTest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ message: "모든 사항을 입력하세요" });
    }

    const newUser = await createUser(email, name, password);

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
