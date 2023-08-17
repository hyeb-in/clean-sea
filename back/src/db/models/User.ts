import UserModel from "../schemas/userSchema";

export const findUserById = async (userId: string) => {
  const user = await UserModel.findById(userId);
  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  return user;
};

export const createNewUser = async (
  email: string,
  name: string,
  hashedPassword: string
) => {
  const newUser = await UserModel.create({
    email,
    name,
    password: hashedPassword,
  });

  return newUser;
};
