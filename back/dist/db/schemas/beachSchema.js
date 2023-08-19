"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeachModel = void 0;
const mongoose_1 = require("mongoose");
const BeachSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: false,
    },
    longitude: {
        type: Number,
        required: false,
    },
    goodnessFit: {
        type: Boolean,
        required: false,
    },
    eschScore: {
        type: Number,
        required: false,
    },
    enteScore: {
        type: Number,
        required: false,
    },
    ente: {
        type: Number,
        required: false,
    },
    esch: {
        type: Number,
        required: false,
    },
});
const BeachModel = (0, mongoose_1.model)("Beach", BeachSchema);
exports.BeachModel = BeachModel;
//# sourceMappingURL=beachSchema.js.map