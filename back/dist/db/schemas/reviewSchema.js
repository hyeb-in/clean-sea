"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    uploadFile: {
        type: String,
    },
}, {
    timestamps: true,
});
const ReviewModel = (0, mongoose_1.model)('review', ReviewSchema);
exports.ReviewModel = ReviewModel;
//# sourceMappingURL=reviewSchema.js.map