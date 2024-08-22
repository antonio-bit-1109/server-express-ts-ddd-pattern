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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController_Class = void 0;
const inversify_1 = require("inversify");
const AuthServices_1 = require("../../_Domain/Services/AuthServices");
const types_1 = require("../../_dependency_inject/types");
let AuthController_Class = class AuthController_Class {
    authServices;
    constructor(authServices_DEPEND) {
        this.authServices = authServices_DEPEND;
    }
    async autenticate(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "email o password mancante." });
            }
            const tokensObj = await this.authServices.autenticateHandler(email, password);
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
    }
    async refresh(req, res, next) {
        try {
            const cookie = req.cookies;
            if (!cookie?.jwt)
                return res.status(401).json({ message: "Unauthorized. non stai fornendo il cookie per il refresh ? " });
            const refreshToken = cookie.jwt;
            const resultRefreshAction = await this.authServices.refreshTokenHandler(refreshToken);
            if (typeof resultRefreshAction !== "string") {
                throw resultRefreshAction;
            }
            return res.json({ accessToken: resultRefreshAction });
        }
        catch (err) {
            next(err);
        }
    }
    async logout(req, res, next) {
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
    }
};
exports.AuthController_Class = AuthController_Class;
exports.AuthController_Class = AuthController_Class = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.AUTH_SERVICES)),
    __metadata("design:paramtypes", [AuthServices_1.AuthServices])
], AuthController_Class);
