"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.logEvents = void 0;
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// funzione asincrona che registra gli eventi del server in un file di log.
// In sintesi, questo codice definisce una funzione logEvents che registra eventi con un timestamp e un ID univoco in un file di log. Se la cartella logs o il file di log non esistono, li crea.
const logEvents = async (message, logFileName) => {
    const dateTime = `${(0, date_fns_1.format)(new Date(), "ddMMyyyy\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${(0, uuid_1.v4)()}\t${message}\n`;
    try {
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, "..", "logs"))) {
            await fs_2.default.promises.mkdir(path_1.default.join(__dirname, "..", "logs"));
        }
        await fs_2.default.promises.appendFile(path_1.default.join(__dirname, "..", "logs", logFileName), logItem);
    }
    catch (err) {
        console.log(err);
    }
};
exports.logEvents = logEvents;
// questa funzione chiama LogEvents e registra: metodo,url,header che il client sta chiedendo nel file reqLog.log
// "registratore di eventi che accadoo sul server.
// con next() chiama il middlewere successivo."
const logger = (req, res, next) => {
    (0, exports.logEvents)(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
    console.log(`${req.method} ${req.path}`);
    next();
};
exports.logger = logger;
// module.exports = { logEvents, logger };
// export { logEvents, logger };
