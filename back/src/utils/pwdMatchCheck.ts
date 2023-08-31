import { IUser } from "user";
import bcrypt from "bcrypt";
import { errorGenerator } from "./errorGenerator";

/**
 * @param password
 * @param user
 * @description 비밀번호 일치, 불일치 확인
 * @returns 1. 비밀번호 불일치시 throw error 2.일치시 isMatched(true)
 */
export const pwdMatchCheck = async (password: string, user: IUser) => {
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    console.log(isMatched);
    const error = errorGenerator("비밀번호가 일치하지 않습니다.", 400);
    throw error;
  }

  return isMatched;
};
