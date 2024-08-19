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
        const token = await authServices.autenticate(email, password);
        if (typeof token !== "string") {
            throw token;
        }
        return res.status(200).json(token);
    }
    catch (err) {
        next(err);
    }
};
const refresh = async (req, res, next) => { };
const logout = async (req, res, next) => { };
exports.default = { autenticate, refresh, logout };
