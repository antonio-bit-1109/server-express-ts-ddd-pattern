// le entità sono sono i "modelli fondamentali dell applicazione"

//USER - ENTITà FONDAMENTALE  E CON SPECIFICHE PROPRIETà
import NomeUser from "../ValueObjects/UserObjs/NomeUser";
import CognomeUser from "../ValueObjects/UserObjs/CognomeUser";
import EmailUser from "../ValueObjects/UserObjs/EmailUser";
import PasswordUser from "../ValueObjects/UserObjs/PasswordUser";
import { ICleanUser, IUser } from "../../interfaces/interfaces";
import { ObjectId } from "mongodb";
import StatusUser from "../ValueObjects/UserObjs/StatusUser";
import { RuoliUser } from "../ValueObjects/UserObjs/Ruoliuser";

class User {
    private nome: NomeUser;
    private cognome: CognomeUser;
    private email: EmailUser;
    private password: PasswordUser;
    private status: StatusUser;
    private ruoli: RuoliUser;
    constructor(
        nome: string,
        cognome: string,
        email: string,
        password: string,
        method: string,
        status: boolean = true,
        ruoli: string[]
    ) {
        try {
            this.nome = new NomeUser(nome, method);
            this.cognome = new CognomeUser(cognome, method);
            this.email = new EmailUser(email, method);
            this.password = new PasswordUser(password, method);
            this.status = new StatusUser(status);
            this.ruoli = new RuoliUser(ruoli);
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
            ruoli: this.ruoli.getValue(),
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
            Ruoli: this.ruoli.getValue(),
        };
    }
}

export default User;
