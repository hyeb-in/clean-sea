"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const travelController_1 = require("../controllers/travelController");
const authenticateJwt_1 = require("../middlewares/authenticateJwt");
const travelAuthRouter = (0, express_1.Router)();
travelAuthRouter
    .post('/register', authenticateJwt_1.jwtAuthentication, travelController_1.createTravel)
    .get('/travelList', authenticateJwt_1.jwtAuthentication, travelController_1.getMyTravel);
travelAuthRouter.get('/:userId', authenticateJwt_1.jwtAuthentication, travelController_1.getUserTravel);
travelAuthRouter
    .route('/:travelId')
    .put(authenticateJwt_1.jwtAuthentication, travelController_1.updateTravel)
    .delete(authenticateJwt_1.jwtAuthentication, travelController_1.deleteTravel);
exports.default = travelAuthRouter;
//# sourceMappingURL=travelRouter.js.map