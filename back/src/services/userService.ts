import bcrypt from "bcrypt";
import {
  create,
  deleteById,
  findUserByEmail,
  getRandomUser,
  update,
} from "../db/models/User";
import { IRequest, IUser } from "user";
import { generateRandomPassword } from "../utils/randomPassword";
import { mailSender } from "../utils/sendMail";
import { errorGenerator } from "../utils/errorGenerator";

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

  if (user) {
    throw errorGenerator("이미 존재하는 이메일 입니다.", 403);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await create(name, email, hashedPassword);

  return createdUser;
};

export const updateUserService = async (
  userId: string,
  inputData: Partial<IUser>
) => {
  const updatedUser = await update(userId, inputData);
  if (!updatedUser) throw new Error("유저가 존재하지 않습니다.");
  return updatedUser;
};

export const deleteUserService = async (userId: string) => {
  const deletedUser = await deleteById(userId);

  if (!deletedUser) throw errorGenerator("유저가 존재하지 않습니다.", 403);

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
