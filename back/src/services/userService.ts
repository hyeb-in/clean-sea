import bcrypt from "bcrypt";
import {
  create,
  deleteById,
  findUserByEmail,
  updateUserName,
  getRandomUser,
  update,
  findUserById,
} from "../db/models/User";
import { IUser } from "user";
import { generateRandomPassword } from "../utils/randomPassword";
import { mailSender } from "../utils/sendMail";
import { errorGenerator } from "../utils/errorGenerator";
import UserModel from "../db/schemas/userSchema";

/**
 * @param {*} email
 * @param {*} name
 * @param {*} password
 * @returns createdUser
 * @description 유저 존재하는지 체크한 후 유저 생성
 */
export const createUserService = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const user = await findUserByEmail(email);

  if (user) throw errorGenerator("이미 존재하는 이메일 입니다.", 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await create(name, email, hashedPassword);

  return createdUser;
};

export const updateUserService = async (
  userId: string,
  inputData: Partial<IUser>
) => {
  //1. 먼저 db에 있는 user정보를 가져온다.
  const user = await UserModel.findById(userId);
  if (!user) throw errorGenerator("유저가 존재하지 않습니다.", 400);

  //2. 하나씩 비교한다.
  const changedValue: Record<string, string | string[]> = {};
  let key: keyof IUser;
  for (key in inputData) {
    if (user[key] !== inputData[key]) {
      changedValue[key] = inputData[key] as string | string[];
    }
  }

  //3.일부분만 업데이트 해준다.
  const updatedUser = await update(userId, changedValue);
  if (!updatedUser) throw errorGenerator("업데이트에 실패했습니다.", 403);

  if('name' in changedValue){
    const newUserName = changedValue['name'] as string;
    await updateUserName(userId, newUserName);
  }
  return updatedUser;
};

export const deleteUserService = async (userId: string) => {
  const deletedUser = await deleteById(userId);

  if (!deletedUser) throw errorGenerator("유저가 존재하지 않습니다.", 400);

  return deletedUser;
};

export const resetPasswordService = async (userId: string, email: string) => {
  const newPassword = generateRandomPassword();
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  mailSender(email, "비밀번호 초기화 이메일", newPassword);
  const updatedUser = await update(userId, { password: hashedPassword });

  return updatedUser;
};

export const getRandomUserService = async () => {
  const randomUser = await getRandomUser();
  return randomUser;
};

export const changePasswordService = async (
  userId: string,
  newPassword: string
) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedPwdUser = await update(userId, { password: hashedPassword });
  return updatedPwdUser;
};

export const getUserService = async (userId: string) => {
  const user = await findUserById(userId);
  return user;
}
