"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionString = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getConnectionString = () => {
    try {
        if (process.env.NODE_ENV === "dev") {
            let connectionString = process.env.CONNECTION_STRING_DEV_DB || "default connection string";
            console.log("acquisizione stringa di connessione...");
            return connectionString;
        }
        return "default";
    }
    catch (err) {
        console.log(err);
        return "default connection string";
    }
};
exports.getConnectionString = getConnectionString;
