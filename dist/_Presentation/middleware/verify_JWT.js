"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_Jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verify_Jwt = async (req, res, next) => {
    try {
        console.log(req.headers);
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (typeof authHeader !== "string") {
            return res.status(401).json({ message: "Bearer Token non in formato stringa. Ricontrolla" });
        }
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "controlla il Bearer token. Unautorized." });
        }
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.SECRET_FIRMA_TOKEN || "default_secret_token", async (err, decoded) => {
            if (err)
                return res.status(403).json({ message: "Forbidden. errore. Token scaduto." });
            const decodedToken = decoded;
            req.userId = decodedToken.UserInfo.userId;
            req.nomeutente = decodedToken.UserInfo.nomeUser;
            req.IsActive = decodedToken.UserInfo.isActive;
            req.roles = decodedToken.UserInfo.roles;
            next();
        });
    }
    catch (err) {
        next(err);
    }
};
exports.verify_Jwt = verify_Jwt;
