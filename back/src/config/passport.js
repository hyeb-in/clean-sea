import passport from "passport";
import LocalStrategy from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const localOptions = {
  usernameField: "email",
  passwordField: "password",
};

const jwtOptions = {
  secretOrkey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  "local",
  new LocalStrategy(localOptions, async (email, password, done) => {})
);

passport.use("jwt", new JwtStrategy(jwtOptions, async (payload, done) => {}));
