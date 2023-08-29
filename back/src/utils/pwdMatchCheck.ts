import { IUser } from "user";
import bcrypt from "bcrypt";
import { errorGenerator } from "./errorGenerator";

export const pwdMatchCheck = async (password: string, user: IUser) => {
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    const error = errorGenerator("비밀번호가 일치하지 않습니다.", 403);
    throw error;
  }
  return isMatched;
};
