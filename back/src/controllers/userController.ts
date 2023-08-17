import { NextFunction, Request, Response } from "express";
import { userService } from "../services/userService";
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

    const newUser = await userService.createUser(email, name, password);

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 *
 * @param
 * @description 로그인 함수 user 정보 + 토큰 값 넘겨준다.
 */
export const loginUser = async (
  req: RequestTest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = {
      token: req.token,
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    };
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
