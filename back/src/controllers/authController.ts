import { NextFunction, Response } from "express";
import { IRequest } from "user";

export const loginUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = {
      token: req.token,
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      profileImage: req.user.profileImage,
    };
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
