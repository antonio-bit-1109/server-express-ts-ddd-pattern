// import asyncHandler from "express-async-handler";
// import UserAppService from "../../_Application/AppServices/UserAppServices.js";
import { Response, Request, NextFunction } from "express";
import { DataCreateUser } from "../../interfaces/interfaces.js";
import UserServices from "../../_Domain/Services/UserServices.js";
import UserRepository from "../../_Domain/Repositories/UserRepository.js";
import UserModel from "../../_Infrastructures/database/models/UserModel.js";

// Instanza i servizi e repository
const userRepository = new UserRepository(UserModel);
const userServices = new UserServices(UserRepository);

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
        const userData: DataCreateUser = req.body;
        // const newUser = await UserServices.createUser(userData);
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

export default { createUser };
