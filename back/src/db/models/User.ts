import { IUser } from "user";
import UserModel from "../schemas/userSchema";

export const findUserById = async (userId: string): Promise<IUser> => {
  const user = await UserModel.findById(userId);
  return user;
};

export const findUserByEmail = async (email: string): Promise<IUser> => {
  const user = await UserModel.findOne({ email });
  return user;
};

export const createNewUser = async (
  newUserInput: Pick<IUser, "name" | "email" | "password">
): Promise<IUser> => {
  const newUser = await UserModel.create(newUserInput);

  return newUser;
};
