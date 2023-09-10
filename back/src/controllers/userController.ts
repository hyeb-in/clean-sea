import { NextFunction, Response } from "express";
import {
  changePasswordService,
  createUserService,
  deleteUserService,
  getRandomUserService,
  getUserService,
  resetPasswordService,
  updateUserService,
} from "../services/userService";
import { IRequest } from "user";
import { findUserByEmail, findUserById } from "../db/models/User";
import { errorGenerator } from "../utils/errorGenerator";
import { pwdMatchCheck } from "../utils/pwdMatchCheck";
import { StatusCodes } from "http-status-codes";
import { deletePassword } from "../utils/deletePassword";

/**
 * @param {*} req name,email,password
 * @return res.status(200).json(newUser);
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
    console.time("1Timer");
    const userWithoutPassword = deletePassword(newUser);
    console.timeEnd("1Timer");
    res.status(StatusCodes.OK).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

/**
 * @returns res.status(200).json(randomUser);
 * @description 랜덤 유저 호출 api
 */
export const getRandomUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const randomUsers = await getRandomUserService();

    const isRandomUser = true;

    const randomUser = randomUsers.reduce((acc, user) => {
      acc.push(deletePassword(user, isRandomUser));
      return acc;
    }, []);

    res.status(StatusCodes.OK).json(randomUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @returns res.status(200).json(req.user);
 * @description 현재 유저 호출 jwt에서 DB user검색 후 넘겨줌
 * @description 현재 세션의 유저 호출 api
 */
export const getCurrentUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userWithoutPassword = deletePassword(req.user);
    res.status(StatusCodes.OK).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

/**
 * @param req userId
 * @returns res.status(200).json(updatedUser);
 * @description id값으로 유저 호출 api
 */
export const getUserById = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await getUserService(userId);

    const userWithoutPassword = deletePassword(user);
    return res.status(StatusCodes.OK).json(userWithoutPassword);
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
    const userWithoutPassword = deletePassword(updatedUser);

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

/**
 * @param req userId
 * @returns res.status(200).json(user);
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
    const userWithoutPassword = deletePassword(user);
    res.status(StatusCodes.OK).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

/**
 * @param req email
 * @returns res.status(200).json(resetedUser);
 * @description 비밀번호 초기화 api
 */
export const resetPassword = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    if (!user) throw errorGenerator("해당 이메일은 존재하지 않습니다.", 400);
    const userId = user._id;
    const resetedUser = await resetPasswordService(userId, email);

    const userWithoutPassword = deletePassword(resetedUser);
    res.status(StatusCodes.OK).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

/**
 * @param req email
 * @returns res.status(200).json(updatedPwdUser);
 * @description 비밀번호 변경 api
 */
export const changePassword = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { confirmPassword, newPassword } = req.body;

    const user = await findUserById(userId);

    if (!user) throw errorGenerator("해당 이메일은 존재하지 않습니다.", 400);

    await pwdMatchCheck(confirmPassword, user);

    const updatedPwdUser = await changePasswordService(userId, newPassword);
    const userWithoutPassword = deletePassword(updatedPwdUser);
    res.status(StatusCodes.OK).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};
