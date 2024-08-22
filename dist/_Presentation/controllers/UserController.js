"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserServices_1 = require("../../_Domain/Services/UserServices");
const UserRepository_1 = require("../../_Domain/Repositories/UserRepository");
const UserModel_1 = __importDefault(require("../../_Infrastructures/database/models/UserModel"));
// import User from "../../_Domain/Entities/User";
const utilityFunctions_1 = require("../../utils/utilityFunctions");
// import { checkBodyStructure } from "../../utils/utilityFunctions";
// Instanza i servizi e repository
const userRepository = new UserRepository_1.UserRepository(UserModel_1.default);
const userServices = new UserServices_1.UserServices(userRepository);
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
        const { nome, cognome, email, password } = req.body;
        const BodyasExpected = (0, utilityFunctions_1.isBodyAsExpected)(utilityFunctions_1.checkBodyStructure, req.body, { nome, cognome, email, password });
        if (!BodyasExpected) {
            return res.status(400).json({ message: `body fornito non corretto.` });
        }
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
        const { nome, cognome, email, password } = req.body;
        // funzione per controllare che la struttura del body in arrivo dal client sia come si aspetta il controller.
        const BodyasExpected = (0, utilityFunctions_1.isBodyAsExpected)(utilityFunctions_1.checkBodyStructure, req.body, { nome, cognome, email, password });
        if (!BodyasExpected) {
            return res.status(400).json({ message: `body fornito non corretto.` });
        }
        const editData = req.body;
        const esitoEdit = await userServices.EditUser(editData);
        console.log(esitoEdit);
        if (typeof esitoEdit === "string") {
            return res.status(200).json({ message: "mofiche salvate correttamente." });
        }
        if (esitoEdit instanceof Error) {
            return res.status(400).json({ message: esitoEdit });
        }
        return res.status(500).json({ message: "errore durante la modifica." });
    }
    catch (err) {
        next(err);
    }
};
const changeStatus = async (req, res, next) => {
    try {
        const { status, idUser } = req.body;
        //controllo che il body inviato del client abbia la struttura che si aspetta il controller
        const BodyasExpected = (0, utilityFunctions_1.isBodyAsExpected)(utilityFunctions_1.checkBodyStructure, req.body, { status, idUser });
        if (!BodyasExpected) {
            return res.status(400).json({ message: `body fornito non corretto.` });
        }
        const result = await userServices.changeStatus(status, idUser);
        if (result instanceof Error) {
            // throw new Error(result.message)
            return res.status(400).json({ message: result });
        }
        if (typeof result === "string") {
            return res.status(200).json({ message: result });
        }
        return res.status(500).json({ message: "errore durante la modifica dello status account." });
    }
    catch (err) {
        next(err);
    }
};
exports.default = { createUser, getAllUsers, editUser, changeStatus };
