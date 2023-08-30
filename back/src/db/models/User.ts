import { IUser } from "user";
import UserModel from "../schemas/userSchema";

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
  const { password, ...userWithoutPassword } = newUser.toObject();

  return userWithoutPassword;
};

export const update = async (userId: string, changedValue: Partial<IUser>) => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, changedValue, {
    new: true,
  });
  const { password, ...userWithoutPassword } = updatedUser.toObject();

  return userWithoutPassword;
};

export const deleteById = async (userId: string) => {
  const user = await UserModel.findByIdAndDelete(userId);
  return user;
};

export const getRandomUser = async () => {
  const randomUsers = await UserModel.aggregate([{ $sample: { size: 5 } }]);
  const randomUser = randomUsers.reduce((acc, user) => {
    const { password, ...userWithoutPassword } = user;
    acc.push(userWithoutPassword);
    return acc;
  }, []);

  return randomUser;
};
