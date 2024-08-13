// le entità sono sono i "modelli fondamentali dell applicazione"

//USER - ENTITà FONDAMENTALE  E CON SPECIFICHE PROPRIETà
import NomeUser from "../ValueObjects/NomeUser.js";
import CognomeUser from "../ValueObjects/CognomeUser.js";
import EmailUser from "../ValueObjects/EmailUser.js";
import PasswordUser from "../ValueObjects/PasswordUser.js";
import { ICleanUser } from "../../interfaces/interfaces.js";

class User {
    private nome: NomeUser;
    private cognome: CognomeUser;
    private email: EmailUser;
    private password: PasswordUser;

    constructor(nome: string, cognome: string, email: string, password: string) {
        try {
            this.nome = new NomeUser(nome);
            this.cognome = new CognomeUser(cognome);
            this.email = new EmailUser(email);
            this.password = new PasswordUser(password);
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error("errore sconosciuto.");
            }
        }
    }

    Clean(): ICleanUser {
        return {
            nome: this.nome.getValue(),
            cognome: this.cognome.getValue(),
            email: this.email.getValue(),
            password: this.password.getValue(),
        };
    }
}

export default User;
