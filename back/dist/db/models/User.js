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
exports.deleteById = exports.update = exports.create = exports.findUserByEmail = exports.findUserById = void 0;
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.default.findById(userId);
    return user;
});
exports.findUserById = findUserById;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.default.findOne({ email });
    return user;
});
exports.findUserByEmail = findUserByEmail;
const create = (name, email, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userSchema_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    console.log(newUser);
    return newUser;
});
exports.create = create;
const update = (userId, inputData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield userSchema_1.default.findByIdAndUpdate(userId, inputData, {
        new: true,
    });
    return updatedUser;
});
exports.update = update;
const deleteById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.default.findByIdAndDelete(userId);
    return user;
});
exports.deleteById = deleteById;
//# sourceMappingURL=User.js.map