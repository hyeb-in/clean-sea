import { NextFunction, Response } from "express";
import {
  createUserService,
  deleteUserService,
  resetPasswordService,
  updateUserService,
} from "../services/userService";
import { IRequest } from "user";
import { generateRandomPassword } from "../utils/randomPassword";
import { mailSender } from "../utils/sendMail";
import { findUserByEmail } from "../db/models/User";

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

    const newUser = await createUserService(name, email, password);

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @description 랜덤 유저 호출
 */
export const getRandomUser = () => {};

/**
 * @description id값으로 유저 호출 api
 */
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

/**
 *
 * @description update api
 */
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

/**
 *
 * @description 회원탈퇴 api
 */
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

export const resetPassword = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  //1.이메일을 받아온다.
  //2. 실제로 그 이메일이 회원가입한 유저인지 파악한다.
  //3. 이메일을 보낸다.

  if (!user) throw new Error("해당 이메일은 존재하지 않습니다.");

  const userId = user._id;
  resetPasswordService(userId, email);
};
