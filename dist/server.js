"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const corsOptions_1 = require("./config/corsOptions");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = __importDefault(require("./_Presentation/middleware/errorHandler"));
const connectDb_1 = require("./config/connectDb");
const serverIsListening_1 = require("./config/serverIsListening");
const logger_1 = require("./_Presentation/middleware/logger");
const Migrations_1 = __importDefault(require("./_Infrastructures/migrationsDb/Migrations"));
const cors_1 = __importDefault(require("cors"));
const root_1 = __importDefault(require("./_Presentation/routes/root"));
const UserRoute_1 = __importDefault(require("./_Presentation/routes/UserRoute"));
const BookRoute_1 = __importDefault(require("./_Presentation/routes/BookRoute"));
const GetConnectionString_1 = require("./config/GetConnectionString");
dotenv_1.default.config();
const app = (0, express_1.default)();
// const __filename = fileURLToPath(__filename);
// const __dirname = dirname(__filename);
app.use("/", express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(logger_1.logger);
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// -------------------------------------------------------- redirect alle routes ----------------------------------------------------
app.use("/", root_1.default);
app.use("/users", UserRoute_1.default);
app.use("/product", BookRoute_1.default);
//-----------------------------------------------------------------------------------------------------------------------------------
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path_1.default.join(__dirname, "views", "404.html"));
    }
    else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    }
    else {
        res.type("txt").send("404 Not Found");
    }
});
app.use(errorHandler_1.default);
//
async function startServer() {
    if (process.env.NODE_ENV === "dev") {
        const porta = process.env.PORT_DEV || "4000";
        const connString = (0, GetConnectionString_1.getConnectionString)();
        if (connString.startsWith("mongodb+srv:")) {
            await (0, connectDb_1.connectDB)(connString);
        }
        else {
            throw new Error("connection string fornita non è quella corretta.");
        }
        // migrazioni e aggiornamento dei documenti
        await Migrations_1.default.Add_CampoPassword_to_User();
        await Migrations_1.default.addCampoIsActive_To__User();
        (0, serverIsListening_1.serverIsListening)(app, porta);
    }
    mongoose_1.default.connection.on("error", (err) => {
        console.log(err);
        (0, logger_1.logEvents)(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
    });
}
startServer();
mongoose_1.default.connection.on("error", (err) => {
    console.log(err);
    (0, logger_1.logEvents)(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
});
exports.default = app;
