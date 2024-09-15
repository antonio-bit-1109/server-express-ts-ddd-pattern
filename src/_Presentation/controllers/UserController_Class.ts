import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../_dependency_inject/types";
import { UserServices } from "../../_Domain/Services/UserServices";
import { checkBodyStructure, isBodyAsExpected } from "../../utils/utilityFunctions";
import { Request, Response, NextFunction } from "express";
import { DataCreateUser, DTO_Data_User_Edit, DTO_user_change_status } from "../../interfaces/interfaces";

@injectable()
class UserController_Class {
    private userServices: UserServices;

    constructor(@inject(TYPES.USER_SERVICES) userServices_DEPEND: UserServices) {
        this.userServices = userServices_DEPEND;
    }

    public async createUser(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            //BODY : // {nome, cognome,email ,password}
            const { nome, cognome, email, password /* ruoli */ } = req.body;
            const BodyasExpected = isBodyAsExpected(checkBodyStructure, req.body, {
                nome,
                cognome,
                email,
                password,
                // ruoli,
            });
            if (!BodyasExpected) {
                return res.status(400).json({ message: `body fornito non corretto.` });
            }

            if (!nome || !cognome || !email || !password) {
                return res.status(400).json({ message: "non hai fornito tutti i dati richiesti." });
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

    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            // chiama il servizio per recuperare tutti gli utenti.
            const allUsers = await this.userServices.takeAllUsers();
            return res.status(200).json(allUsers);
        } catch (err) {
            next(err);
        }
    }

    public async editUser(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            // dati dal body per l'edit I CAMPI DA NON MODIFICARE DEVONO ESSERE STRINGHE VUOTE ("")
            const { nome, cognome, email, password } = req.body;

            // funzione per controllare che la struttura del body in arrivo dal client sia come si aspetta il controller.

            const BodyasExpected = isBodyAsExpected(checkBodyStructure, req.body, { nome, cognome, email, password });
            if (!BodyasExpected) {
                return res.status(400).json({ message: `body fornito non corretto.` });
            }

            const editData: DTO_Data_User_Edit = req.body;

            const esitoEdit = await this.userServices.EditUser(editData);
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
    }

    public async changeStatus(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const { status, idUser }: DTO_user_change_status = req.body;
            //controllo che il body inviato del client abbia la struttura che si aspetta il controller

            const BodyasExpected = isBodyAsExpected(checkBodyStructure, req.body, { status, idUser });
            if (!BodyasExpected) {
                return res.status(400).json({ message: `body fornito non corretto.` });
            }

            const result = await this.userServices.changeStatus(status, idUser);
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
    }

    public async rediscoverPassword(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            console.log(req);
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ message: "nessuna email fornita." });
            }

            const userFoundByEmail = await this.userServices.handleResetPsw(email);
            // if (!userFoundByEmail) {
            //     return res.status(400).json({ message: "nessun utente trovato per l'email fornita." });
            // }
        } catch (err) {
            next(err);
        }
        // return res.status(200).json({ message: "arrivata la request con successo." });
    }
}

export { UserController_Class };
