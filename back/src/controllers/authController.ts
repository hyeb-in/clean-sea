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
      name: req.user.name,
      email: req.user.email,
      description: req.user.description,
      uploadFile: req.user.uploadFile,
      updatedAt: req.user.updatedAt,
      createdAt: req.user.createdAt,
    };

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
