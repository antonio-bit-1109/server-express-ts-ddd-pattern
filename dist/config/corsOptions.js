"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigin_js_1 = __importDefault(require("./allowedOrigin.js"));
exports.corsOptions = {
    origin: (origin, callback) => {
        if (origin === undefined || allowedOrigin_js_1.default.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS."));
        }
    },
    credentials: true, // permette invio di cookie
    optionsSuccessStatus: 200,
};
// module.exports = corsOptions;
// export default corsOptions;
