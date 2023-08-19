"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.httpLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const logDir = "logs";
const infoLogDir = path_1.default.join(logDir, "info"); // info 로그를 저장할 폴더 경로
const errorLogDir = path_1.default.join(logDir, "error"); // error 로그를 저장할 폴더 경로
const { combine, timestamp, printf } = winston_1.default.format;
const logFormat = printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});
/**
 * Log Level
 * error:0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston_1.default.createLogger({
    format: combine(timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), logFormat),
    transports: [
        new winston_daily_rotate_file_1.default({
            level: "info",
            filename: path_1.default.join(infoLogDir, "%DATE%.info.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxFiles: "30d",
        }),
        new winston_daily_rotate_file_1.default({
            level: "error",
            filename: path_1.default.join(errorLogDir, "%DATE%.error.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxFiles: "30d",
        }),
    ],
});
function httpLogger(req, res, next) {
    (0, morgan_1.default)(':method :url :status :response-time ms - :res[content-length] :body', {
        stream: {
            write: (message) => {
                logger.info(message);
            },
        },
    })(req, res, next);
}
exports.httpLogger = httpLogger;
morgan_1.default.token('body', (req, res) => {
    return JSON.stringify(req.body);
});
function errorMiddleware(error, req, res, next) {
    logger.error(error);
    res.status(400).send(error.message);
}
exports.errorMiddleware = errorMiddleware;
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    }));
}
//# sourceMappingURL=logger.js.map