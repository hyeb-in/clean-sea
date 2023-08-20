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
exports.deleteUserService = exports.updateUserService = exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../db/models/User");
/**
 * @param {*} email
 * @param {*} name
 * @param {*} password
 * @returns createdUser
 * @description 유저 존재하는지 체크한 후 유저 생성
 */
const createUserService = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, User_1.findUserByEmail)(email);
    if (user) {
        throw new Error("이미 존재하는 이메일입니다.");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const createdUser = yield (0, User_1.create)(name, email, hashedPassword);
    return createdUser;
});
exports.createUserService = createUserService;
const updateUserService = (userId, inputData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield (0, User_1.update)(userId, inputData);
    if (!updatedUser)
        throw new Error("유저가 존재하지 않습니다.");
    return updatedUser;
});
exports.updateUserService = updateUserService;
const deleteUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield (0, User_1.deleteById)(userId);
    if (!deletedUser)
        throw new Error("유저가 존재하지 않습니다.");
    return deletedUser;
});
exports.deleteUserService = deleteUserService;
//# sourceMappingURL=userService.js.map