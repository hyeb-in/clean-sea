import passport from "passport";
import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { IRequest, IUser } from "user";
import { errorGenerator } from "../utils/errorGenerator";

export const localAuthentication = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  try {
    passport.authenticate(
      "local",
      { session: false },
      (error: Error, user: IUser, info: any) => {
        if (error) {
          const err = errorGenerator(error.message, 403);
          next(err);
        }

        if (info) {
          const err = errorGenerator(info.message, 400);
          next(err);
        }
        //토큰 테스트하려고 짧게해둔 변경할 것
        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
          expiresIn: "1m",
        });
        req.token = token;
        req.user = user;
        next();
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};
