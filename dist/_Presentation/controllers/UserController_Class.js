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
exports.UserController_Class = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../../_dependency_inject/types");
const UserServices_1 = require("../../_Domain/Services/UserServices");
const utilityFunctions_1 = require("../../utils/utilityFunctions");
let UserController_Class = class UserController_Class {
    userServices;
    constructor(userServices) {
        this.userServices = userServices;
    }
    async createUser(req, res, next) {
        try {
            //BODY : // {nome, cognome,email ,password}
            const { nome, cognome, email, password } = req.body;
            const BodyasExpected = (0, utilityFunctions_1.isBodyAsExpected)(utilityFunctions_1.checkBodyStructure, req.body, { nome, cognome, email, password });
            if (!BodyasExpected) {
                return res.status(400).json({ message: `body fornito non corretto.` });
            }
            const userData = req.body;
            const newUser = await this.userServices.createUser(userData);
            if (newUser) {
                return res.status(201).json({ message: "utente creato con successo." });
            }
            else {
                throw new Error("Errore nella creazione dell'utente");
            }
        }
        catch (err) {
            next(err); // Passa l'errore al middleware di gestione degli errori
        }
    }
};
exports.UserController_Class = UserController_Class;
exports.UserController_Class = UserController_Class = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.USER_SERVICES)),
    __metadata("design:paramtypes", [UserServices_1.UserServices])
], UserController_Class);
