"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const reviewRouter_1 = __importDefault(require("./routes/reviewRouter"));
const travelRouter_1 = __importDefault(require("./routes/travelRouter"));
const beachRouter_1 = __importDefault(require("./routes/beachRouter"));
const logger_1 = require("./config/logger");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const { swaggerUi, specs } = require("./swagger/swagger");
require("./db/index");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(passport_1.default.initialize());
// localStrategy();
// jwtStrategy();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/", (req, res) => {
    res.send("기본 페이지");
});
app.use(logger_1.httpLogger);
app.use("/users", userRouter_1.default);
app.use("/reviews", reviewRouter_1.default);
app.use("/travels", travelRouter_1.default);
app.use("/beaches", beachRouter_1.default);
app.use("/auth", authRouter_1.default);
app.use(logger_1.errorMiddleware);
//# sourceMappingURL=app.js.map