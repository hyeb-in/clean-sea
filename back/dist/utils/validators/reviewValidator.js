"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class ReviewValidator {
    static postReview() {
        return joi_1.default.object({
            title: joi_1.default.string().min(4).required().messages({
                'string.base': "문자여야합니다.",
                'string.min': '4글자이상이여야합니다.',
            }),
            content: joi_1.default.string().required().messages({
                'string.base': "문자여야합니다.",
            }),
        });
    }
    static putReview() {
        return joi_1.default.object({
            title: joi_1.default.string().min(4).optional().messages({
                'string.base': "문자여야합니다.",
                'string.min': '4글자이상이여야합니다.',
            }),
            content: joi_1.default.string().optional().messages({
                'string.base': "문자여야합니다.",
            }),
        });
    }
}
exports.ReviewValidator = ReviewValidator;
//# sourceMappingURL=reviewValidator.js.map