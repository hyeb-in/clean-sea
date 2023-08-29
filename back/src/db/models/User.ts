import { IUser } from "user";
import UserModel from "../schemas/userSchema";
import { findUserReviews } from "./Review";

export const findUserById = async (userId: string): Promise<IUser> => {
  const user = await UserModel.findById(userId);
  return user;
};

/**
 *
 * @param email ({email} 아님)
 * @returns
 */
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

  return newUser;
};

export const update = async (userId: string, changedValue: Partial<IUser>) => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, changedValue, {
    new: true,
  });

  await findUserReviews(userId, updatedUser);
  return updatedUser;
};

export const deleteById = async (userId: string) => {
  const user = await UserModel.findByIdAndDelete(userId);
  return user;
};

export const getRandomUser = async () => {
  const randomUser = await UserModel.aggregate([{ $sample: { size: 5 } }]);
  return randomUser;
};
