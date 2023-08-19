"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.addressNameValidator = exports.beachNameValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const http_status_codes_1 = require("http-status-codes");
const beachNameValidator = () => {
    return joi_1.default.object({
        name: joi_1.default.string().required(),
    });
};
exports.beachNameValidator = beachNameValidator;
const addressNameValidator = () => {
    return joi_1.default.object({
        address: joi_1.default.string().required(),
    });
};
exports.addressNameValidator = addressNameValidator;
function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.params);
        if (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(error.details[0].message);
        }
        else {
            next();
        }
    };
}
exports.validate = validate;
//# sourceMappingURL=beachValidator.js.map