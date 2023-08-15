import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import { DailyRotateFile } from "winston/lib/winston/transports";
import morgan from 'morgan';
import path from "path";

const logDir = "logs";
const infoLogDir = path.join(logDir, "info"); // info 로그를 저장할 폴더 경로
const errorLogDir = path.join(logDir, "error"); // error 로그를 저장할 폴더 경로

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

/**
 * Log Level
 * error:0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new DailyRotateFile({
      level: "info",
      filename: "%DATE%.log",
      datePattern: "YYYY-MM-DD",
      dirname: infoLogDir,
      zippedArchive: true,
      maxFiles: "30d",
    }),
    new DailyRotateFile({
      level: "error",
      filename: "%DATE%.error.log",
      datePattern: "YYYY-MM-DD",
      dirname: errorLogDir,
      zippedArchive: true,
      maxFiles: "30d",
    }),
  ],
  exceptionHandlers: [
    new winstonDaily({
      level: "error",
      filename: "%DATE%.exception.log",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      zippedArchive: true,
      maxFiles: "30d",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

function httpLogger(req,res,next){
  morgan('combined',{
    stream : {
      write : (message) => {
        logger.http(message,trim());
      },
    },
  })(req,res,next);
}

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}


export { logger, httpLogger };