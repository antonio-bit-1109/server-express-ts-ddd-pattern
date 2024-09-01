"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import { serverIsListening } from "./serverIsListening.js";
const connectDB = async (connectionString) => {
    try {
        console.log("Tentativo di connessione a MongoDB con la stringa di connessione:", connectionString);
        await mongoose_1.default.connect(connectionString);
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("Errore durante la connessione al database", err);
        throw err;
    }
};
exports.connectDB = connectDB;
