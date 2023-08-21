import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { findUserByEmail, findUserById } from "../db/models/User";
import bcrypt from "bcrypt";
import { IUser } from "user";

const localOptions = {
  usernameField: "email",
  passwordField: "password",
};

const localCallback = async (email: string, password: string, done: any) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return done(null, false, { message: "회원이 존재하지 않습니다." });
    }
    bcrypt.genSalt;
    console.log("local전략 유저", user);
    const isMatched = await bcrypt.compare(password, user.password);
    console.log("매치", isMatched);
    if (!isMatched) {
      return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
    }
    return done(null, user);
  } catch (err) {
    done(err);
  }
};

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtCallback = async (payload: any, done: any) => {
  try {
    const { id } = payload;
    const user = await findUserById(id);

    if (!user) {
      return done(null, false, { message: "사용자가 존재하지 않습니다." });
    }

    return done(null, user);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

export const localStrategy = () =>
  passport.use("local", new LocalStrategy(localOptions, localCallback));

export const jwtStrategy = () =>
  passport.use("jwt", new JwtStrategy(jwtOptions, jwtCallback));
