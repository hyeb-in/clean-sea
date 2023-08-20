"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = exports.localStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("../db/models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const localOptions = {
    usernameField: "email",
    passwordField: "password",
};
const localCallback = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, User_1.findUserByEmail)(email);
        if (!user) {
            return done(null, false, { message: "회원이 존재하지 않습니다." });
        }
        bcrypt_1.default.genSalt;
        console.log("local전략 유저", user);
        const isMatched = yield bcrypt_1.default.compare(password, user.password);
        console.log("매치", isMatched);
        if (!isMatched) {
            return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
        }
        return done(null, user);
    }
    catch (err) {
        done(err);
    }
});
const jwtOptions = {
    secretOrKey: process.env.JWT_SECRET_KEY,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const jwtCallback = (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = payload;
        const user = yield (0, User_1.findUserById)(id);
        if (!user) {
            return done(null, false, { message: "사용자가 존재하지 않습니다." });
        }
        return done(null, user);
    }
    catch (err) {
        console.error(err);
        done(err);
    }
});
const localStrategy = () => passport_1.default.use("local", new passport_local_1.Strategy(localOptions, localCallback));
exports.localStrategy = localStrategy;
const jwtStrategy = () => passport_1.default.use("jwt", new passport_jwt_1.Strategy(jwtOptions, jwtCallback));
exports.jwtStrategy = jwtStrategy;
//# sourceMappingURL=passport.js.map