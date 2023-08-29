import { NextFunction, Response } from "express";
import {
  changePasswordService,
  createUserService,
  deleteUserService,
  getRandomUserService, getUserService,
  resetPasswordService,
  updateUserService,
} from "../services/userService";
import { IRequest } from "user";
import { findUserByEmail, findUserById, update } from "../db/models/User";
import { errorGenerator } from "../utils/errorGenerator";
import { pwdMatchCheck } from "../utils/pwdMatchCheck";
import bcrypt from "bcrypt";

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
    //const err = errorGenerator(error.message,statusCode);
    //next(err)
    next(error);
  }
};

/**
 * @description 랜덤 유저 호출
 */
export const getRandomUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const randomUser = await getRandomUserService();

    res.status(200).json(randomUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @description 현재 세션의 유저 호출 api
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
 * @description id값으로 유저 호출 api
 */
export const getUserById = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params['userId'];
    const user = await getUserService(id);
    return res.status(200).json(user);
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
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    if (!user) throw errorGenerator("해당 이메일은 존재하지 않습니다.", 403);
    const userId = user._id;
    const resetedUser = await resetPasswordService(userId, email);
    res.status(200).json(resetedUser);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { confirmPassword, newPassword } = req.body;

    const user = await findUserById(userId);
    const isMatched = await bcrypt.compare(confirmPassword, user.password);
    if (!isMatched) {
      const error = errorGenerator("비밀번호가 일치하지 않습니다.", 403);
      throw error;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedPwdUser = await update(userId, { password: hashedPassword });
    res.status(200).json(updatedPwdUser);
  } catch (error) {
    next(error);
  }
};
