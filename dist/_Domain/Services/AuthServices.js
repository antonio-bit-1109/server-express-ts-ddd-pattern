"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const inversify_1 = require("inversify");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../../_dependency_inject/types");
// import { takeSecretKey } from "../../utils/utilityFunctions";
let AuthServices = class AuthServices {
    userRepository;
    // constructor(userRepository: IUserRepository) {
    //     this.userRepository = userRepository;
    // }
    constructor(userRepository_DEPEND) {
        this.userRepository = userRepository_DEPEND;
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
};
exports.AuthServices = AuthServices;
exports.AuthServices = AuthServices = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], AuthServices);
