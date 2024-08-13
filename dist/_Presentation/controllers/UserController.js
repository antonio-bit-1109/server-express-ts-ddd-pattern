"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserServices_js_1 = __importDefault(require("../../_Domain/Services/UserServices.js"));
const UserRepository_js_1 = __importDefault(require("../../_Domain/Repositories/UserRepository.js"));
const UserModel_js_1 = __importDefault(require("../../_Infrastructures/database/models/UserModel.js"));
// Instanza i servizi e repository
const userRepository = new UserRepository_js_1.default(UserModel_js_1.default);
const userServices = new UserServices_js_1.default(userRepository);
// const createUser = asyncHandler(async (req, res) => {
//     // {nome, cognome,email ,password}
//     const userData = req.body;
//     const newUser = await UserAppService.createUser(userData);
//     if (newUser) {
//         return res.status(201).json({ message: "utente creato con successo." });
//     }
// });
const createUser = async (req, res, next) => {
    try {
        //BODY : // {nome, cognome,email ,password}
        const userData = req.body;
        const newUser = await userServices.createUser(userData);
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
};
exports.default = { createUser };
