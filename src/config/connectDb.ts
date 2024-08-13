import mongoose from "mongoose";
// import { serverIsListening } from "./serverIsListening.js";

export const connectDB = async (connectionString: string) => {
    try {
        console.log("Tentativo di connessione a MongoDB con la stringa di connessione:", connectionString);
        await mongoose.connect(connectionString);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Errore durante la connessione al database", err);
        throw err;
    }
};
