import { IUser } from "user";
import bcrypt from "bcrypt";

export const pwdMatchCheck = async (password: string, user: IUser) => {
  const isMatched = await bcrypt.compare(password, user.password);
  return isMatched;
};
