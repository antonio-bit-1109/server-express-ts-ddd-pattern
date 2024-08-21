"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { takeSecretKey } from "../../utils/utilityFunctions";
class AuthServices {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async autenticateHandler(email, password) {
        try {
            console.log(email, password);
            // trovo lo ser a partire dalla mail
            const user = await this.userRepository.findByEmail(email);
            if (user instanceof Error) {
                throw user;
            }
            //confronto che la psw criptata e quella inviata dal client combacino
            const isPswMatching = bcrypt_1.default.compareSync(password, user.Password);
            if (!isPswMatching) {
                throw new Error("Errore : Le password non corrispondono AuthServices - autenticate");
            }
            // se tutto ok uso le info dello user per creare un token
            const token = jsonwebtoken_1.default.sign({
                UserInfo: {
                    userId: user._id,
                    nomeUser: user.Nome,
                    isActive: user.IsActive,
                },
            }, process.env.SECRET_FIRMA_TOKEN || "default_secret", { expiresIn: "10m" });
            const refreshToken = jsonwebtoken_1.default.sign({ username: user.Nome }, process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret", {
                expiresIn: "7d",
            });
            return { token, refreshToken };
        }
        catch (err) {
            return err;
        }
        //   const user = await this.userRepository.autenticateUser(username, password);
    }
    async refreshTokenHandler(refreshToken) {
        try {
            jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "default_secret", async (err, decoded) => {
                try {
                    if (err) {
                        console.log("si è verificato un errore...");
                        throw err;
                    }
                    if (decoded) {
                        console.log("token decodificato...");
                        const user = await this.userRepository.findById(decoded.UserInfo.userId);
                        if (!user) {
                            throw new Error("utente non trovato al momento della verifica del token di refresh");
                        }
                        if (user instanceof Error) {
                            throw user;
                        }
                        const newAccessToken = jsonwebtoken_1.default.sign({
                            UserInfo: {
                                userId: user._id,
                                nomeUser: user.Nome,
                                isActive: user.IsActive,
                            },
                        }, process.env.SECRET_FIRMA_TOKEN || "default_secret", { expiresIn: "10m" });
                        return newAccessToken;
                    }
                }
                catch (err) {
                    if (err instanceof Error) {
                        throw err;
                    }
                    throw new Error("errore durante la verifica del token - Auth Services");
                }
            });
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante il refresh del token - Auth Services");
        }
    }
}
exports.default = AuthServices;
