"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: './uploadFile/',
    filename: function (req, file, cb) {
        const imageName = new Date().getTime() + "-" + file.originalname;
        cb(null, imageName);
    }
});
exports.storage = storage;
//# sourceMappingURL=storage.js.map