import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
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
      uploadFile: req.user.uploadFile,
    };

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};
