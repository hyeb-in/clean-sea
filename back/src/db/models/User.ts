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

export const create = async (
  name: string,
  email: string,
  hashedPassword: string
) => {
  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });
  console.log(newUser);

  return newUser;
};

export const update = async (userId: string, inputData: Partial<IUser>) => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, inputData, {
    new: true,
  });

  return updatedUser;
};
export const deleteById = async (userId: string) => {
  const user = await UserModel.findByIdAndDelete(userId);
  return user;
};
