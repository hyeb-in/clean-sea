"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpValidate = exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
const emailReg = new RegExp("/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/");
const nameReg = /^[a-zA-Z가-힣]$/;
const passwordReg = /^[a-zA-Z0-9!@#;:'-_=+,./?]$/;
exports.schema = joi_1.default.object().keys({
    name: joi_1.default.string().min(2).max(20).required().pattern(nameReg),
    email: joi_1.default.string().required().pattern(emailReg),
    password: joi_1.default.string().min(4).max(30).required().pattern(passwordReg),
});
const signUpValidate = (naem, email, password) => {
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string().min(2).max(20).required().pattern(nameReg),
        email: joi_1.default.string().required().pattern(emailReg),
        password: joi_1.default.string().min(4).max(30).required().pattern(passwordReg),
    });
};
exports.signUpValidate = signUpValidate;
//# sourceMappingURL=userValidator.js.map