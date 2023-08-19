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
exports.getBeaches = exports.getBeachByRegion = exports.getBeachByBeachName = void 0;
const beachService_1 = require("../services/beachService");
const getBeachByBeachName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const result = yield (0, beachService_1.getBeachByBeachNameService)({ name });
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});
exports.getBeachByBeachName = getBeachByBeachName;
const getBeachByRegion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.params.address;
        const result = yield (0, beachService_1.getBeachByRegionService)({ address });
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});
exports.getBeachByRegion = getBeachByRegion;
const getBeaches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, beachService_1.getBeachesService)();
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});
exports.getBeaches = getBeaches;
//# sourceMappingURL=beachController.js.map