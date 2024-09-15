// import UserModel from "../../_Infrastructures/database/models/UserModel";
import {
    DataCreateUser,
    DTO_Data_User_Edit,
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

            const esito = await this.SendEmail(email);
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

    private async SendEmail(email: string): Promise<Error | string> {
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

            // const transporter = createTransport();

            let mailOptions = {
                from: "antoniorizzuti767@gmail.com", // L'indirizzo del mittente
                to: `${email}`, // L'indirizzo del destinatario
                subject: "Reimpostazione della password", // Oggetto dell'email
                text: "clicca il link sottostante per essere reindirizzato alla pagina di reimpostazione della password.", // Corpo dell'email in testo
                // Se desideri inviare HTML, usa il campo 'html' invece di 'text'
                html: "<a>http://localhost:3500</a>",
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
}

export { UserServices };
