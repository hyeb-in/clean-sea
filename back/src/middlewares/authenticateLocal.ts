import passport from "passport";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { RequestTest } from "user";

export const localAuthentication = async (
  req: RequestTest,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  try {
    passport.authenticate(
      "local",
      { session: false },
      async (error: Error, user: any, info: any) => {
        if (error) throw error;
        if (!user) return res.status(400).json({ message: info.message });
        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY);

        req.user = user;
        req.token = token;

        res.status(200).send({
          message: "로그인 성공",
          token: token,
          user: user,
        });
      }
    )(req, res, next);
  } catch (err) {
    next(err);
  }
};
