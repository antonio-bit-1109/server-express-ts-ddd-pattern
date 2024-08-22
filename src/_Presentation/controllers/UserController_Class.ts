import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../_dependency_inject/types";
import { UserServices } from "../../_Domain/Services/UserServices";
import { checkBodyStructure, isBodyAsExpected } from "../../utils/utilityFunctions";
import { Request, Response, NextFunction } from "express";
import { DataCreateUser } from "../../interfaces/interfaces";

@injectable()
class UserController_Class {
    private userServices: UserServices;

    constructor(@inject(TYPES.USER_SERVICES) userServices: UserServices) {
        this.userServices = userServices;
    }

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            //BODY : // {nome, cognome,email ,password}
            const { nome, cognome, email, password } = req.body;
            const BodyasExpected = isBodyAsExpected(checkBodyStructure, req.body, { nome, cognome, email, password });
            if (!BodyasExpected) {
                return res.status(400).json({ message: `body fornito non corretto.` });
            }
            const userData: DataCreateUser = req.body;
            const newUser = await this.userServices.createUser(userData);
            if (newUser) {
                return res.status(201).json({ message: "utente creato con successo." });
            } else {
                throw new Error("Errore nella creazione dell'utente");
            }
        } catch (err) {
            next(err); // Passa l'errore al middleware di gestione degli errori
        }
    }
}

export { UserController_Class };
