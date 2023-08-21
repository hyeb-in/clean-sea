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
exports.deleteTravel = exports.updateTravel = exports.findUserTravel = exports.findUserTravels = exports.createTravel = void 0;
const travelSchema_1 = require("../schemas/travelSchema");
function createTravel(toCreate) {
    return __awaiter(this, void 0, void 0, function* () {
        const newTravel = yield travelSchema_1.TravelModel.create(toCreate);
        return newTravel;
    });
}
exports.createTravel = createTravel;
function findUserTravels(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userTravels = yield travelSchema_1.TravelModel.find({ author: userId });
        return userTravels;
    });
}
exports.findUserTravels = findUserTravels;
function findUserTravel(travelId) {
    return __awaiter(this, void 0, void 0, function* () {
        const travel = yield travelSchema_1.TravelModel.findOne({ author: travelId });
        return travel;
    });
}
exports.findUserTravel = findUserTravel;
function updateTravel(id, toUpdate) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedTravel = yield travelSchema_1.TravelModel.findOneAndUpdate({ _id: id }, toUpdate, { returnOriginal: false });
        return updatedTravel;
    });
}
exports.updateTravel = updateTravel;
function deleteTravel(travelId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedTravel = yield travelSchema_1.TravelModel.findOneAndDelete({ _id: travelId });
        return deletedTravel;
    });
}
exports.deleteTravel = deleteTravel;
//# sourceMappingURL=Travel.js.map