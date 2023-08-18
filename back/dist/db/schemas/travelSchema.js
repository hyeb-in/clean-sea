"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelModel = void 0;
const mongoose_1 = require("mongoose");
const TravelSchema = new mongoose_1.Schema({
    author: {
        type: String,
        required: true,
    },
    beachId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});
const TravelModel = (0, mongoose_1.model)('travel', TravelSchema);
exports.TravelModel = TravelModel;
//# sourceMappingURL=travelSchema.js.map