import { NextFunction, Request, Response } from "express";
import passport from "passport";
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
        if (error) throw error;
        if (info) {
          if (info.message === "jwt expired")
            return res.status(401).json("토큰 만료");

          if (info.message === "No auth token")
            return res.status(401).json("토큰 없음");

          if (info.message === "user not exist")
            return res.status(404).json("User Not Found!");
        }

        req.user = user;

        next();
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};
