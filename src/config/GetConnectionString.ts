import dotenv from "dotenv";

dotenv.config();

export const getConnectionString = () => {
    try {
        if (process.env.NODE_ENV === "dev") {
            let connectionString: string = process.env.CONNECTION_STRING_DEV_DB || "default connection string";
            console.log("acquisizione stringa di connessione...");
            return connectionString;
        }

        return "default";
    } catch (err) {
        console.log(err);
        return "default connection string";
    }
};
