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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserInfo = exports.signUpUser = void 0;
const userService_1 = require("../services/userService");
/**
 * @param {*} req name,email,password
 * @description 회원가입 api
 */
const signUpUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ message: "모든 사항을 입력하세요" });
        }
        const newUser = yield (0, userService_1.createUser)(name, email, password);
        res.status(200).json(newUser);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.signUpUser = signUpUser;
const getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json(req.user);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getUserInfo = getUserInfo;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const {} = req.body;
});
exports.updateUser = updateUser;
const deleteUser = () => { };
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map