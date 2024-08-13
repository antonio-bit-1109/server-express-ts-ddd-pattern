import { logEvents } from "./logger";
import { Request, Response, NextFunction } from "express";

// Logger per registrare gli errori che si verificano sul server in un file --> logs/errLog.log (cartella logs)
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log");
    console.log(err.stack);

    const status = res.statusCode !== 200 ? res.statusCode : 500; // server error

    res.status(status).json({ message: err.message });
};

// module.exports = errorHandler;

export default errorHandler;
