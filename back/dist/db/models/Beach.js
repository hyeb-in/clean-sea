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
exports.Beaches = exports.BeachByRegion = exports.BeachByBeachName = void 0;
const beachSchema_1 = require("../schemas/beachSchema");
function BeachByBeachName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const getBeaches = yield beachSchema_1.BeachModel.findOne({ name: name });
        return getBeaches;
    });
}
exports.BeachByBeachName = BeachByBeachName;
function BeachByRegion(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const getBeaches = yield beachSchema_1.BeachModel.find({ address: address });
        return getBeaches;
    });
}
exports.BeachByRegion = BeachByRegion;
function Beaches() {
    return __awaiter(this, void 0, void 0, function* () {
        const getBeaches = yield beachSchema_1.BeachModel.find({});
        return getBeaches;
    });
}
exports.Beaches = Beaches;
//# sourceMappingURL=Beach.js.map