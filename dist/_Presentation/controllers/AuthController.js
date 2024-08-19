"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthServices_1 = __importDefault(require("../../_Domain/Services/AuthServices"));
const UserRepository_1 = __importDefault(require("../../_Domain/Repositories/UserRepository"));
const UserModel_1 = __importDefault(require("../../_Infrastructures/database/models/UserModel"));
const userRepository = new UserRepository_1.default(UserModel_1.default);
const authServices = new AuthServices_1.default(userRepository);
const autenticate = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "email o password mancante." });
        }
        const tokensObj = await authServices.autenticate(email, password);
        if (tokensObj instanceof Error) {
            throw tokensObj;
        }
        const { token, refreshToken } = tokensObj;
        res.cookie("jwt", { refreshToken }, {
            httpOnly: true,
            // secure: true,
            // sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ accessToken: { token } });
    }
    catch (err) {
        next(err);
    }
};
const refresh = async (req, res, next) => { };
const logout = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        if (!cookie.jwt) {
            return res.sendStatus(204); // no content
        }
        res.clearCookie("jwt", { httpOnly: true /*sameSite: "none", secure: true*/ });
        return res.status(200).json({ message: "cookie cleared" });
    }
    catch (err) {
        next(err);
    }
};
exports.default = { autenticate, refresh, logout };
