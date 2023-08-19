"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class TravelValidator {
    static postTravel() {
        return joi_1.default.object({
            date: joi_1.default.date().iso().required(),
        });
    }
    static putTravel() {
        return joi_1.default.object({
            date: joi_1.default.date().iso().optional(),
        });
    }
}
exports.TravelValidator = TravelValidator;
//# sourceMappingURL=travelValidator.js.map