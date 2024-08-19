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
    async autenticate(email, password) {
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
}
exports.default = AuthServices;
