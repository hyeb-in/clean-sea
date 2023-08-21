"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const emailReg = "";
const nameReg = "";
exports.signupSchema = joi_1.default.object().keys({
    name: joi_1.default.string().min(2).required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().min(4),
});
//# sourceMappingURL=userValidator.js.map