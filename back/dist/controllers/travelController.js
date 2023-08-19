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
exports.deleteTravel = exports.updateTravel = exports.getUserTravel = exports.getMyTravel = exports.createTravel = void 0;
const http_status_codes_1 = require("http-status-codes");
const travelService_1 = require("../services/travelService");
const travelValidator_1 = require("../utils/validators/travelValidator");
const sendResponse = function (res, statusCode, data) {
    if (statusCode >= 400) {
    }
    else {
        res.status(statusCode).json(data);
    }
};
const createTravel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = req.user._id;
        const schema = travelValidator_1.TravelValidator.postTravel();
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return sendResponse(res, http_status_codes_1.StatusCodes.BAD_REQUEST, {
                error: validationResult.error.details[0].message,
            });
        }
        const addMyTravel = yield (0, travelService_1.addTravel)({
            toCreate: Object.assign(Object.assign({}, req.body), { author }),
        });
        return sendResponse(res, http_status_codes_1.StatusCodes.CREATED, addMyTravel);
    }
    catch (err) {
        next(err);
    }
});
exports.createTravel = createTravel;
const getMyTravel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myTravel = yield (0, travelService_1.getTravel)(req.user._id);
        return sendResponse(res, http_status_codes_1.StatusCodes.OK, myTravel);
    }
    catch (err) {
        next(err);
    }
});
exports.getMyTravel = getMyTravel;
const getUserTravel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userTravel = yield (0, travelService_1.getTravel)(req.params.userId);
        return sendResponse(res, http_status_codes_1.StatusCodes.OK, userTravel);
    }
    catch (err) {
        next(err);
    }
});
exports.getUserTravel = getUserTravel;
const updateTravel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.travelId;
        const schema = travelValidator_1.TravelValidator.putTravel();
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return sendResponse(res, http_status_codes_1.StatusCodes.BAD_REQUEST, {
                error: validationResult.error.details[0].message,
            });
        }
        const updatedTravel = yield (0, travelService_1.setTravel)(id, {
            toUpdate: Object.assign({}, req.body),
        });
        return sendResponse(res, http_status_codes_1.StatusCodes.OK, updatedTravel);
    }
    catch (err) {
        next(err);
    }
});
exports.updateTravel = updateTravel;
const deleteTravel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteTravel = yield (0, travelService_1.deletedTravel)(req.params.travelId);
        return sendResponse(res, http_status_codes_1.StatusCodes.OK, deleteTravel);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteTravel = deleteTravel;
//# sourceMappingURL=travelController.js.map