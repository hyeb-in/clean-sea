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
exports.localAuthentication = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const localAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    try {
        passport_1.default.authenticate("local", { session: false }, (error, user, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            if (!user)
                return res.status(400).json({ message: info.message });
            //토큰 테스트하려고 짧게해둔 변경할 것
            const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET_KEY, {
                expiresIn: "30m",
            });
            req.token = token;
            req.user = user;
            next();
        }))(req, res, next);
    }
    catch (err) {
        next(err);
    }
});
exports.localAuthentication = localAuthentication;
//# sourceMappingURL=authenticateLocal.js.map