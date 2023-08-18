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
  name: string,
  email: string,
  hashedPassword: string
): Promise<IUser> => {
  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};
