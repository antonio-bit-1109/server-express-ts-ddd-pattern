import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { corsOptions } from "./config/corsOptions";
import cookieParser from "cookie-parser";
import errorHandler from "./_Presentation/middleware/errorHandler";
import { connectDB } from "./config/connectDb";
import { serverIsListening } from "./config/serverIsListening";
import { logEvents, logger } from "./_Presentation/middleware/logger";
import MigrationFunction from "./_Infrastructures/migrationsDb/Migrations";
import cors from "cors";
import RootRoute from "./_Presentation/routes/root";
import UserRoute from "./_Presentation/routes/UserRoute";
import { getConnectionString } from "./config/GetConnectionString";

dotenv.config();
const app = express();

// const __filename = fileURLToPath(__filename);
// const __dirname = dirname(__filename);

app.use("/", express.static(path.join(__dirname, "public")));
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// -------------------------------------------------------- redirect alle routes ----------------------------------------------------
app.use("/", RootRoute);
app.use("/users", UserRoute);

//-----------------------------------------------------------------------------------------------------------------------------------
app.all("*", (req, res) => {
    res.status(404);

    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler);
//

async function startServer() {
    if (process.env.NODE_ENV === "dev") {
        const porta = process.env.PORT_DEV || "4000";

        const connString: string = getConnectionString();

        if (connString.startsWith("mongodb+srv:")) {
            await connectDB(connString);
        } else {
            throw new Error("connection string fornita non è quella corretta.");
        }

        // migrazioni e aggiornamento dei documenti
        await MigrationFunction.Add_CampoPassword_to_User();

        serverIsListening(app, porta);
    }

    mongoose.connection.on("error", (err) => {
        console.log(err);
        logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
    });
}

startServer();
mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
});

export default app;
