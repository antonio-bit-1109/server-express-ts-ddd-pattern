"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
// Logger per registrare gli errori che si verificano sul server in un file --> logs/errLog.log (cartella logs)
const errorHandler = (err, req, res, next) => {
    (0, logger_1.logEvents)(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log");
    console.log(err.stack);
    const status = res.statusCode !== 200 ? res.statusCode : 500; // server error
    res.status(status).json({ message: err.message });
};
// module.exports = errorHandler;
exports.default = errorHandler;
