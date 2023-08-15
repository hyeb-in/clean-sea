import passport from "passport";
import LocalStrategy from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../db/models/User";
import bcrypt from "bcrypt";

const localOptions = {
  usernameField: "email",
  passwordField: "password",
};

const localCallback = async (email, password, done) => {
  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      return done(null, false, { message: "회원이 존재하지 않습니다." });
    }

    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched) {
      return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
    }
    return done(null, user);
  } catch (err) {
    done(err);
  }
};

const jwtOptions = {
  secretOrkey: process.env.JWT_SECRET_fsdfKEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtCallback = async (payload, done) => {
  try {
    const { id } = payload;
    const user = await User.findUserById(id);

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
