const { createLogger, format, transports } = require("winston");
const { timestamp, combine, printf, json, colorize, errors } = format;
require("winston-mongodb");
require("dotenv/config");

// Custom format for console
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: "verbose",

  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        logFormat
      ),
    }),

    new transports.File({
      filename: "./Logs/infoLogs.log",
      level: "info",
      format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
    }),

    new transports.File({
      filename: "./Logs/verboseLogs.log",
      level: "verbose",
      format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
    }),

    new transports.File({
      filename: "./Logs/errorLogs.log",
      level: "error",
      format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
    }),

    new transports.MongoDB({
      level: "error",
      db: process.env.DB_CONNECTION,
      options: {
        useUnifiedTopology: true,
      },
      collection: "EmployeeErrorLogs",
      format: combine(timestamp(), json()), //mongodb always require json format
    }),
  ],
});

module.exports = logger;
