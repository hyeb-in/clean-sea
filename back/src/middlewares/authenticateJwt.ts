import { NextFunction, Response } from "express";
import passport from "passport";
import { errorGenerator } from "../utils/errorGenerator";
import { IRequest, IUser } from "user";

export const jwtAuthentication = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate(
      "jwt",
      { session: false },
      (error: Error, user: IUser, info: any) => {
        if (error) {
          const err = errorGenerator(error.message, 500);
          next(err);
        }
        if (info) {
          const err = errorGenerator(info.message, 401);
          next(err);
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};
