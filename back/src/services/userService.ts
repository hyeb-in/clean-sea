import bcrypt from "bcrypt";
import { createNewUser, findUserByEmail } from "../db/models/User";
import { IUser } from "user";

/**
 * @param {*} email
 * @param {*} name
 * @param {*} password
 * @returns createdUser
 * @description 유저 존재하는지 체크한 후 유저 생성
 */
export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const user = await findUserByEmail(email);

  if (user) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await createNewUser(name, email, hashedPassword);

  return createdUser;
};
