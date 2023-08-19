"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const beachController_1 = require("../controllers/beachController");
const beachValidator_1 = require("../utils/validators/beachValidator");
const authenticateJwt_1 = require("../middlewares/authenticateJwt");
const beachRouter = (0, express_1.Router)();
beachRouter
    .get('/beachbyname/:name', (0, beachValidator_1.validate)((0, beachValidator_1.beachNameValidator)()), authenticateJwt_1.jwtAuthentication, beachController_1.getBeachByBeachName);
beachRouter
    .get('/beachesbyregion/:address', (0, beachValidator_1.validate)((0, beachValidator_1.addressNameValidator)()), authenticateJwt_1.jwtAuthentication, beachController_1.getBeachByRegion);
beachRouter
    .get('/beaches', authenticateJwt_1.jwtAuthentication, beachController_1.getBeaches);
exports.default = beachRouter;
//# sourceMappingURL=beachRouter.js.map