import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { RequestTest, user } from "user";

export const jwtAuthentication = async (
  req: RequestTest,
  res: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate(
      "jwt",
      { session: false },
      (error: Error, user: user, info: any) => {
        if (error) throw error;
        if (info) {
          if (info.message === "jwt expired")
            return res.status(401).json("토큰 만료");

          if (info.message === "No auth token")
            return res.status(401).json("토큰 없음");

          if (info.message === "user not exist")
            return res.status(404).json("User Not Found!");
        }
        if (user) {
          req.user = user;
          return res.status(200).send({
            message: "jwt매세지",
            user: user,
            info: info,
          });
        }
      }
    )(req, res, next);
  } catch (error) {
    return res.status(400).json("error");
  }
};
