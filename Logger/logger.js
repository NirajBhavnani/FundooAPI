const { createLogger, format, transports } = require("winston");
const { timestamp, combine, printf, json, colorize } = format;
require("winston-mongodb");
require("dotenv/config");

// Custom format for console
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: "verbose",

  transports: [
    new transports.Console({format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat)}),

    new transports.File({ filename: "./Logger/infoLogs.log", level: "info" , 
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),}),

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
