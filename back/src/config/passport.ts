import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { findUserByEmail, findUserById } from "../db/models/User";
import bcrypt from "bcrypt";

const localOptions = {
  usernameField: "email",
  passwordField: "password",
};

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const localCallback = async (email: string, password: string, done: any) => {
  // findOne함수 더 이상 callback 지원X

  // await UserModel.findOne({ email }, (err: Error, user: IUser) => {
  //   if (err) return done(err);
  //   if (!user)
  //     return done(null, false, { message: "회원이 존재하지 않습니다." });
  //   if (!pwdMatchCheck(password, user))
  //     return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
  //   done(null, user);
  // });
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return done(null, false, { message: "사용자가 존재하지 않습니다." });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
    }
    return done(null, user);
  } catch (error) {
    done(error);
  }
};
const jwtCallback = async (payload: any, done: any) => {
  try {
    const { id } = payload;
    const user = await findUserById(id);

    if (!user) {
      return done(null, false, { message: "사용자가 존재하지 않습니다." });
    }

    return done(null, user);
  } catch (error) {
    done(error);
  }
};

export const localStrategy = () =>
  passport.use("local", new LocalStrategy(localOptions, localCallback));

export const jwtStrategy = () =>
  passport.use("jwt", new JwtStrategy(jwtOptions, jwtCallback));
