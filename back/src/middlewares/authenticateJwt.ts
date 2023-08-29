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
          throw errorGenerator(error.message, 403);
        }
        if (info) {
          if (info.message === "jwt expired") {
            const err = errorGenerator("토큰 만료", 401);
            next(err);
          }

          if (info.message === "No auth token") {
            const err = errorGenerator("토큰 없음", 401);
            next(err);
          }

          if (info.message === "user not exist") {
            const err = errorGenerator("User Not Found!", 404);
            next(err);
          }
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};
