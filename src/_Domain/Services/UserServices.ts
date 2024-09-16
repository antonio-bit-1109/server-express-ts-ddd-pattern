// import UserModel from "../../_Infrastructures/database/models/UserModel";
import {
    DataCreateUser,
    DTO_Data_User_Edit,
    IChangeUserPassword,
    ICleanUser,
    IMongooseUser,
    IMongooseUser_no_psw,
    IMongooseUserId,
    IUser,
    IUserRepository,
} from "../../interfaces/interfaces";
import User from "../Entities/User";
import { TYPES } from "../../_dependency_inject/types";
import { injectable, inject } from "inversify";
import { UserRepository } from "../Repositories/UserRepository";
import nodemailer from "nodemailer";
import { ErrorDescription } from "mongodb";
import { criptID, decriptID } from "../../utils/utilityFunctions";
import { error } from "console";
import PasswordUser from "../ValueObjects/UserObjs/PasswordUser";
//  import {} from "nodemailer"
// import UserRepository from "../Repositories/UserRepository";

@injectable()
class UserServices {
    private userRepository: IUserRepository; // Attributo della classe

    // constructor(userRepository: IUserRepository) {
    //     // Costruttore
    //     this.userRepository = userRepository; // Iniezione della dipendenza
    // }

    constructor(@inject(TYPES.USER_REPOSITORY) userRepository_DEPEND: IUserRepository) {
        this.userRepository = userRepository_DEPEND;
    }

    public async createUser(data: DataCreateUser): Promise<IMongooseUser | Error | null> {
        try {
            //logica di creazione dell'utente
            const user = new User(data.nome, data.cognome, data.email, data.password, "CREATE", true, ["utente"]);
            const cleanUser: ICleanUser = user.Clean();
            const duplicateFound = await this.userRepository.checkForDuplicate(cleanUser.nome, cleanUser.email);
            if (!duplicateFound) {
                const savedUser = await this.userRepository.create(cleanUser);
                return savedUser;
            }
            throw new Error("trovato user duplicato. prova cambiando nome o email.") as Error;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore sconosciuto.");
        }
    }

    public async takeAllUsers(): Promise<IMongooseUser_no_psw[] | Error> {
        try {
            const allUsers = await this.userRepository.getAllUsers();
            if (allUsers) {
                return allUsers;
            }
            throw new Error("impossibile ricavare tutti gli utenti");
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore sconosciuto.");
        }
    }

    public async EditUser(data: DTO_Data_User_Edit) {
        try {
            // passo il body ricevuto dal client alla classe User + valueObject dello user per la validazione dei dati
            const editedUser = new User(data.nome, data.cognome, data.email, data.password, "EDIT", true, data.ruoli);
            console.log(editedUser);
            const cleanObj: IUser = editedUser.CleanWithId(data._id);
            console.log(cleanObj);
            // se l oggetto ritornato con i dati dei campi che l utente vuole modificare contengono un nome e email valida, mi assicuro che non sia gia presente u utente con quei valori di nome ed email

            if (cleanObj.nome !== "" || cleanObj.email !== "") {
                const duplicate = await this.userRepository.checkForDuplicate(
                    cleanObj.nome,
                    cleanObj.email,
                    cleanObj._id.toString()
                );
                if (duplicate instanceof Error) {
                    throw new Error(duplicate.message);
                }
            }
            const esitoSave = await this.userRepository.saveUserChanges(cleanObj);
            return esitoSave;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore sconosciuto.");
        }
    }

    public async changeStatus(status: boolean, id: string): Promise<string | Error> {
        try {
            const userFromDb: IMongooseUserId | Error = await this.userRepository.findById(id);
            if (userFromDb instanceof Error) {
                throw new Error("errore durante il reperimento dell'utente dal database.");
            }
            if (userFromDb.IsActive === status) {
                throw new Error("lo status fornito è uguale a quello corrente.");
            }
            const user = new User(
                userFromDb.Nome,
                userFromDb.Cognome,
                userFromDb.Email,
                userFromDb.Password,
                "STATUS",
                status,
                userFromDb.Ruoli
            );
            const cleanedUser: IUser = user.CleanWithId(id);
            console.log(cleanedUser);
            const changeStatusDb = await this.userRepository.changeStatus(cleanedUser);
            return changeStatusDb;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }

            throw new Error("errore durante il cambiamento di stato dello user -- userservices , change status");
        }
    }

    public async handleResetPsw(email: string) {
        try {
            //email in formato valido?
            const regexValidForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const result = regexValidForm.test(email);
            if (!result) {
                throw new Error("email fornita non nel formato valido. aaa@aaa.it/com - Errore nello user services");
            }

            // trovo utente associato alla mail
            const user = await this.userRepository.findByEmail(email);
            if (user instanceof Error) {
                throw user;
            }

            const esito = await this.SendEmail(email, user._id.toString());
            if (esito instanceof Error) {
                throw esito;
            }
            return esito;
            //se i controlli vengono superati provvedo a creare un metodo per l'invio della mail all email specificata.
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }

            throw new Error(
                "errore durante il reperimento dell utente per il cambio password -- userservices , handleResetPsw"
            );
        }
    }

    // mi serve inviare lo user id per poi poterlo ripescare sempre sul server quando mi arriva la richiesta dal client con la nuova password da impostare, (criptare id prima di inviarlo come email ??)
    private async SendEmail(email: string, userid: string): Promise<Error | string> {
        try {
            console.log(email);

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                    user: "antoniorizzuti767@gmail.com",
                    pass: "hoyyhhftkzywdgsf",
                },
            });

            const criptedUserId: { iv: string; encryptedData: string } = criptID(userid);

            let mailOptions = {
                from: "antoniorizzuti767@gmail.com", // L'indirizzo del mittente
                to: `${email}`, // L'indirizzo del destinatario
                subject: "Reimpostazione della password", // Oggetto dell'email
                text: "clicca il link sottostante per essere reindirizzato alla pagina di reimpostazione della password.", // Corpo dell'email in testo
                // Se desideri inviare HTML, usa il campo 'html' invece di 'text'
                html: ` Clicca sul seguente link per essere Reindirizzato allla pagina di reimpostazione della password <a href="http://localhost:5173/resetPassword?idUser=${criptedUserId.encryptedData}&iv=${criptedUserId.iv}"> CLICCA QUI </a>`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(`Errore durante l'invio dell'email: ${error}`);
                    throw new Error("Errore durante l'invio dell'email");
                }
                // const msg = "Email inviata con successo"
                console.log(`Email inviata con successo: ${info.response}`);
            });

            const msg = "email inviata con successo";
            return msg;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore durante l'invio della mail. Errore nello User Services");
        }
    }

    public async decriptUserId(body: IChangeUserPassword): Promise<Error | string> {
        try {
            const decriptedId: string | Error = decriptID(body.idUser, body.iv);

            if (decriptedId instanceof Error) {
                throw decriptedId;
            }

            const user = await this.userRepository.findById(decriptedId);
            if (user instanceof Error) {
                throw user;
            }

            // mi ritorna lo user trovato tramite id, modifica la password e salva user con il metodo save()
            const updatedUser = await this.userRepository.change_User_Password(user, body.password);
            if (updatedUser instanceof Error) {
                throw updatedUser;
            }

            let msg = "password modificata con successo.";
            return msg;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore durante la decriptazione dell idutente. Errore nello User Services");
        }
    }
}

export { UserServices };
