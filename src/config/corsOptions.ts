import { CorsOptions } from "cors";
import allowedOrigins from "./allowedOrigin";
// import allowedOrigins from "./allowedOrigin.js";

interface params {
    callback: (err: Error | null, allow?: boolean) => void;
}

export const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (origin === undefined || allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS."));
        }
    },
    credentials: true, // permette invio di cookie
    optionsSuccessStatus: 200,
};

// module.exports = corsOptions;

// export default corsOptions;
