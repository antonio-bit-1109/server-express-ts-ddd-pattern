// le entità sono sono i "modelli fondamentali dell applicazione"

//USER - ENTITà FONDAMENTALE  E CON SPECIFICHE PROPRIETà
import NomeUser from "../ValueObjects/NomeUser";
import CognomeUser from "../ValueObjects/CognomeUser";
import EmailUser from "../ValueObjects/EmailUser";
import PasswordUser from "../ValueObjects/PasswordUser";
import { ICleanUser, IUser } from "../../interfaces/interfaces";
import { ObjectId } from "mongodb";
import StatusUser from "../ValueObjects/StatusUser";

class User {
    private nome: NomeUser;
    private cognome: CognomeUser;
    private email: EmailUser;
    private password: PasswordUser;
    private status: StatusUser;

    constructor(
        nome: string,
        cognome: string,
        email: string,
        password: string,
        method: string,
        status: boolean = true
    ) {
        try {
            this.nome = new NomeUser(nome, method);
            this.cognome = new CognomeUser(cognome, method);
            this.email = new EmailUser(email, method);
            this.password = new PasswordUser(password, method);
            this.status = new StatusUser(status);
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
            status: this.status.getValue(),
        };
    }

    CleanWithId(id: string): IUser {
        return {
            _id: new ObjectId(id),
            nome: this.nome.getValue(),
            cognome: this.cognome.getValue(),
            email: this.email.getValue(),
            password: this.password.getValue(),
            isActive: this.status.getValue(),
        };
    }

    // checkEqualStatus(status: boolean) {}
}

export default User;
