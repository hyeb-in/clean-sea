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
import { IRequest, IUser } from "user";
import { findUserByEmail, findUserById } from "../db/models/User";
import { errorGenerator } from "../utils/errorGenerator";
import { pwdMatchCheck } from "../utils/pwdMatchCheck";

const deletePassword = (user: IUser) => {
  const { password: pwd, ...userWithoutPassword } = user.toObject() as IUser;
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

    //1안
    // const filteredKeys = Object.keys(newUser).filter(
    //   (key) => key !== "password"
    // );
    // const userWithoutPassword: any = {};
    // filteredKeys.map((key: keyof IUser) => {
    //   userWithoutPassword[key] = newUser[key];
    // });
    // res.status(200).json(userWithoutPassword["_doc"]);
    // Timer1: 0.267ms
    // 문제점 0.  userWithoutPassword의 모양이 이상 -> userWithoutPassword["_doc"] 으로 접근하면 해결되긴 함
    // 문제점 1.  userWithoutPassword["_doc"] 이 부분이 마음에 걸림.
    // 문제점 2.  const userWithoutPassword: any = {}; any를 너무 남발하는 것 같아서 마음에 걸림.
    //          const userWithoutPassword: Partial<IUser> = {};
    //          const userWithoutPassword: Record<string, string | string[]> = {}; 는 여전히 에러 일어남

    // 2안
    // const newUserTest = Object.entries(newUser)[1][1];

    // const userWithoutPassword = Object.entries(newUserTest).reduce(
    //   (acc: any, [key, value]) => {
    //     if (key !== "password") acc[key] = value;
    //     return acc;
    //   },
    //   {}
    // );
    // res.status(200).json(userWithoutPassword);
    // Timer2: 0.22ms
    // 문제점 0.  Object.entries(newUser)의 모양이 이상 -> Object.entries(newUser)[1][1]으로 접근하면 되긴함
    // -> 다른 함수에서 적용 안되기도 함
    // 문제점 1.  Object.entries(newUser)[1][1]; 난잡함 애초에
    // 문제점 2.  Object.entries(newUser)[1][1]; 이렇게 해줘도 배열이 아니기 때문에 entrise 한번 더해줘야함.

    // 3안
    // const { password: pwd, ...userWithoutPassword } =
    //   newUser.toObject() as IUser;
    // res.status(200).json(userWithoutPassword);
    // Timer3: 0.445ms
    // 문제점 1.   toObject(): unknown; IUser에 이게 추가됨 이렇게 아무렇게나 갖다 붙여서 type이 덕지 덕지 되는게 맞나..

    // 4안
    // 2안과 3안의 혼합
    // const objectUser = newUser.toObject();
    // const userWithoutPassword = Object.entries(objectUser).reduce(
    //   (acc: any, [key, value]) => {
    //     if (key !== "password") {
    //       acc[key] = value;
    //     }
    //     return acc;
    //   },
    //   {}
    // );
    // res.status(200).json(userWithoutPassword);
    // Timer4: 0.694ms
    // 문제점 1.  시간도 제일 오래걸리고 굳이 이걸 쓸 이유가 없어보임

    // 5안 OK

    // const userWithoutPassword: any = {};

    // const objectUser: any = newUser.toObject() as IUser;
    // for (const key in objectUser) {
    //   if (key !== "password") {
    //     userWithoutPassword[key] = objectUser[key];
    //   }
    // }

    // res.status(200).json(userWithoutPassword);
    // Timer5: 0.357ms
    // 문제점 1.  any가 너무여기저기 덕지덕지 붙어있음.

    // 6안
    // 2안 3안 섞었음
    // const newUserTest = Object.entries(newUser)[1][1];
    // const { password: pwd,... userWithoutPassword } = newUserTest;
    // res.status(200).json(userWithoutPassword);
    // Timer6: 0.118ms
    // 문제점 1.    Object.entries(newUser)[1][1]; 이게 너무 마음에 걸림.. -> 다른 함수에서 적용 안되기도 함
    // 장점 1. 속도 제일 빠름
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
      const { password, ...userWithoutPassword } = user;
      acc.push(userWithoutPassword);
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
 * @description 현재 세션의 유저 호출 api
 */
export const getCurrentUser = async (
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
    return res.status(200).json(userWithoutPassword);
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
    res.status(200).json(userWithoutPassword);
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
