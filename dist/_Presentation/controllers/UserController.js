"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserServices_1 = __importDefault(require("../../_Domain/Services/UserServices"));
const UserRepository_1 = __importDefault(require("../../_Domain/Repositories/UserRepository"));
const UserModel_1 = __importDefault(require("../../_Infrastructures/database/models/UserModel"));
// Instanza i servizi e repository
const userRepository = new UserRepository_1.default(UserModel_1.default);
const userServices = new UserServices_1.default(userRepository);
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
const getAllUsers = async (req, res, next) => {
    try {
        // chiama il servizio per recuperare tutti gli utenti.
        const allUsers = await userServices.takeAllUsers();
        return res.status(200).json(allUsers);
    }
    catch (err) {
        next(err);
    }
};
const editUser = async (req, res, next) => {
    try {
        // dati dal body per l'edit I CAMPI DA NON MODIFICARE DEVONO ESSERE STRINGHE VUOTE ("")
        const editData = req.body;
        const esitoEdit = await userServices.EditUser(editData);
        console.log(esitoEdit);
        if (typeof esitoEdit === "string") {
            return res.status(200).json({ message: "mofiche salvate correttamente." });
        }
        if (esitoEdit instanceof Error) {
            return res.status(200).json({ message: esitoEdit });
        }
        return res.status(500).json({ message: "errore durante la modifica." });
        // passoi dat da modificare al servizio dello user.
    }
    catch (err) {
        next(err);
    }
};
exports.default = { createUser, getAllUsers, editUser };
