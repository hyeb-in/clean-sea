import { IUser } from "user";
import UserModel from "../schemas/userSchema";
import { ReviewModel } from "../schemas/reviewSchema";
import { CommentModel } from "../schemas/commetSchema";

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

  return updatedUser;
};

export const updateUserName = async (userId: string, newUserName: string) => {
  const userReviews = await ReviewModel.find({ author: userId }).exec();
  const userComments = await CommentModel.find({ userId }).exec();

  const updatePromises = userReviews.map(async (review) => {
    review.userName = newUserName;
    await review.save();
  });

  const secondPromises = userComments.map(async (comment) => {
    comment.userName = newUserName;
    await comment.save();
  });

  await Promise.all(updatePromises);
  await Promise.all(secondPromises);

  return true;
};

export const deleteById = async (userId: string) => {
  const user = await UserModel.findByIdAndDelete(userId);
  return user;
};

export const getRandomUser = async () => {
  const randomUser = await UserModel.aggregate([{ $sample: { size: 5 } }]);
  return randomUser;
};
