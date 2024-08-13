import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromises from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Request, Response, NextFunction } from "express";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// funzione asincrona che registra gli eventi del server in un file di log.
// In sintesi, questo codice definisce una funzione logEvents che registra eventi con un timestamp e un ID univoco in un file di log. Se la cartella logs o il file di log non esistono, li crea.
export const logEvents = async (message: string, logFileName: string) => {
    const dateTime = `${format(new Date(), "ddMMyyyy\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromises.promises.mkdir(path.join(__dirname, "..", "logs"));
        }
        await fsPromises.promises.appendFile(path.join(__dirname, "..", "logs", logFileName), logItem);
    } catch (err) {
        console.log(err);
    }
};

// questa funzione chiama LogEvents e registra: metodo,url,header che il client sta chiedendo nel file reqLog.log
// "registratore di eventi che accadoo sul server.
// con next() chiama il middlewere successivo."
export const logger = (req: Request, res: Response, next: NextFunction) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
    console.log(`${req.method} ${req.path}`);
    next();
};

// module.exports = { logEvents, logger };
// export { logEvents, logger };
