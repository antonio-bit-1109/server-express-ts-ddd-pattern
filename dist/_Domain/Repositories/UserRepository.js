"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// le repository sono un pattern che serve a gestire l'accesso e la persistenza delle entità e dei value object. Le repository fungono da intermediari tra il dominio e il database, astraggendo i dettagli di implementazione della persistenza e fornendo un'interfaccia per eseguire operazioni CRUD (Create, Read, Update, Delete) sulle entità.
// import mongoose from "mongoose";
const UserModel_mjs_1 = __importDefault(require("../../_Infrastructures/database/models/UserModel.mjs"));
class UserRepository {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async Save(user) {
        try {
            const savedUser = await UserModel_mjs_1.default.create({
                Nome: user.nome.toString(),
                Cognome: user.cognome.toString(),
                Email: user.email.toString(),
                Password: user.password.toString(),
            });
            if (savedUser) {
                console.log("utente creato con successo.");
                return savedUser;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async FindById(id) { }
    async DeleteById(id) { }
    async Edit(user) { }
    async checkForDuplicate(username, email) {
        const duplicateUserByName = await UserModel_mjs_1.default.findOne({ Nome: username });
        const duplicateUserByEmail = await UserModel_mjs_1.default.findOne({ Email: email });
        if (duplicateUserByName) {
            throw new Error("esiste gia un utente con tale nome. cambialo.");
        }
        if (duplicateUserByEmail) {
            throw new Error("esiste gia un utente con questa email. modificala.");
        }
        return;
    }
}
exports.default = UserRepository;
