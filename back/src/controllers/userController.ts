import { NextFunction, Response } from "express";
import {
  changePasswordService,
  createUserService,
  deleteUserService,
  getRandomUserService,
  resetPasswordService,
  updateUserService,
} from "../services/userService";
import { IRequest, IUser } from "user";
import { findUserByEmail, findUserById } from "../db/models/User";
import { errorGenerator } from "../utils/errorGenerator";
import { pwdMatchCheck } from "../utils/pwdMatchCheck";

const deletePassword = (user: IUser) => {
  const userWithoutPassword = {
    name: user.name,
    email: user.email,
    description: user.description,
    _id: user._id,
    uploadFile: user.uploadFile,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return userWithoutPassword;
};
/**
 * @param {*} req name,email,password
 * @return res.status(200).json(newUser);
 * @description 회원가입 api
 */
//TODO newUser 통째로 X password 뺴고
export const signUpUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await createUserService(name, email, password);
    const userWithoutPassword = deletePassword(newUser);
    res.status(200).json(userWithoutPassword);
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
    const randomUser = randomUsers.reduce((acc, user) => {
      acc.push(deletePassword(user));
      return acc;
    }, []);

    res.status(200).json(randomUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @returns res.status(200).json(req.user);
 * @description 현재 유저 호출 jwt에서 DB user검색 후 넘겨줌
 */
export const getUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userWithoutPassword = deletePassword(req.user);
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

/**
 * @param req userId
 * @returns res.status(200).json(updatedUser);
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

    res.status(200).json(user);
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
    res.status(200).json(userWithoutPassword);
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
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};
