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
exports.getBeachesService = exports.getBeachByRegionService = exports.getBeachByBeachNameService = void 0;
const Beach_1 = require("../db/models/Beach");
// 해수욕장 명칭 하나로 가져오기
function getBeachByBeachNameService(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const beachDataOne = yield (0, Beach_1.BeachByBeachName)(name);
        return beachDataOne;
    });
}
exports.getBeachByBeachNameService = getBeachByBeachNameService;
// 지역별 가져오기
function getBeachByRegionService(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const beachDataRegion = yield (0, Beach_1.BeachByRegion)(address);
        return beachDataRegion;
    });
}
exports.getBeachByRegionService = getBeachByRegionService;
// 전체 가져오기
function getBeachesService() {
    return __awaiter(this, void 0, void 0, function* () {
        const beachData = yield (0, Beach_1.Beaches)();
        if (beachData.length === 0) {
            return [];
        }
        // 모든 이력을 배열로 변환
        const beachDataResult = beachData.map(beach => ({
            id: beach.id,
            name: beach.name,
            address: beach.address,
            goodnessFit: beach.goodnessFit,
            eschScore: beach.eschScore,
            enteScore: beach.enteScore,
            ente: beach.ente,
            esch: beach.esch,
            latitude: beach.latitude,
            longitude: beach.longitude,
        }));
        return beachDataResult;
    });
}
exports.getBeachesService = getBeachesService;
//# sourceMappingURL=beachService.js.map