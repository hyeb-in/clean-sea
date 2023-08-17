import passport from "passport";
import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
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
        //토큰 테스트하려고 짧게해둔 변경할 것
        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
          expiresIn: "30s",
        });
        //req.token =token
        return res.status(200).json(token);
      }
    )(req, res, next);
  } catch (err) {
    next(err);
  }
};
