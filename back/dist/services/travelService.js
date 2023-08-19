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
exports.deletedTravel = exports.setTravel = exports.getTravel = exports.addTravel = void 0;
const Travel_1 = require("../db/models/Travel");
function addTravel({ toCreate }) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdTravel = yield (0, Travel_1.createTravel)(toCreate);
        return createdTravel;
    });
}
exports.addTravel = addTravel;
function getTravel(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const travel = yield (0, Travel_1.findUserTravels)(userId);
        return travel;
    });
}
exports.getTravel = getTravel;
function setTravel(travelId, { toUpdate }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Travel_1.findUserTravel)(travelId);
        const updatedTravel = (0, Travel_1.updateTravel)(travelId, toUpdate);
        return updatedTravel;
    });
}
exports.setTravel = setTravel;
function deletedTravel(travelId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedTravel = yield (0, Travel_1.deleteTravel)(travelId);
        return deletedTravel;
    });
}
exports.deletedTravel = deletedTravel;
//# sourceMappingURL=travelService.js.map