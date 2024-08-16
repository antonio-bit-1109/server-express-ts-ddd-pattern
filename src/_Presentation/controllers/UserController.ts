// import asyncHandler from "express-async-handler";
// import UserAppService from "../../_Application/AppServices/UserAppServices.js";
import { Response, Request, NextFunction } from "express";
import {
    DataCreateUser,
    DTO_Data_User_Edit,
    DTO_user_change_status,
    EditUserData,
    IUser,
} from "../../interfaces/interfaces";
import UserServices from "../../_Domain/Services/UserServices";
import UserRepository from "../../_Domain/Repositories/UserRepository";
import UserModel from "../../_Infrastructures/database/models/UserModel";
import User from "../../_Domain/Entities/User";
import { checkBodyStructure, isBodyAsExpected } from "../../utils/utilityFunctions";
// import { checkBodyStructure } from "../../utils/utilityFunctions";

// Instanza i servizi e repository
const userRepository = new UserRepository(UserModel);
const userServices = new UserServices(userRepository);

// const createUser = asyncHandler(async (req, res) => {
//     // {nome, cognome,email ,password}
//     const userData = req.body;
//     const newUser = await UserAppService.createUser(userData);

//     if (newUser) {
//         return res.status(201).json({ message: "utente creato con successo." });
//     }
// });

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //BODY : // {nome, cognome,email ,password}
        const { nome, cognome, email, password } = req.body;
        const BodyasExpected = isBodyAsExpected(checkBodyStructure, req.body, { nome, cognome, email, password });
        if (!BodyasExpected) {
            return res.status(400).json({ message: `body fornito non corretto.` });
        }
        const userData: DataCreateUser = req.body;
        const newUser = await userServices.createUser(userData);
        if (newUser) {
            return res.status(201).json({ message: "utente creato con successo." });
        } else {
            throw new Error("Errore nella creazione dell'utente");
        }
    } catch (err) {
        next(err); // Passa l'errore al middleware di gestione degli errori
    }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // chiama il servizio per recuperare tutti gli utenti.
        const allUsers = await userServices.takeAllUsers();
        return res.status(200).json(allUsers);
    } catch (err) {
        next(err);
    }
};

const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // dati dal body per l'edit I CAMPI DA NON MODIFICARE DEVONO ESSERE STRINGHE VUOTE ("")
        const { nome, cognome, email, password } = req.body;

        // funzione per controllare che la struttura del body in arrivo dal client sia come si aspetta il controller.

        const BodyasExpected = isBodyAsExpected(checkBodyStructure, req.body, { nome, cognome, email, password });
        if (!BodyasExpected) {
            return res.status(400).json({ message: `body fornito non corretto.` });
        }

        const editData: DTO_Data_User_Edit = req.body;

        const esitoEdit = await userServices.EditUser(editData);
        console.log(esitoEdit);
        if (typeof esitoEdit === "string") {
            return res.status(200).json({ message: "mofiche salvate correttamente." });
        }
        if (esitoEdit instanceof Error) {
            return res.status(400).json({ message: esitoEdit });
        }
        return res.status(500).json({ message: "errore durante la modifica." });
    } catch (err) {
        next(err);
    }
};

const changeStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status, idUser }: DTO_user_change_status = req.body;
        //controllo che il body inviato del client abbia la struttura che si aspetta il controller

        const BodyasExpected = isBodyAsExpected(checkBodyStructure, req.body, { status, idUser });
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
    } catch (err) {
        next(err);
    }
};

export default { createUser, getAllUsers, editUser, changeStatus };
