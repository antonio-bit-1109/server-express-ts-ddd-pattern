import { Model } from "mongoose";
import { ICleanUser, IMongooseUser, IMongooseUser_no_psw, IMongooseUserId, IUser } from "../../interfaces/interfaces";
import { inject, injectable } from "inversify";
import { TYPES } from "../../_dependency_inject/types";
import bcrypt from "bcryptjs";
// import UserModel from "../../_Infrastructures/database/models/UserModel";

@injectable()
class UserRepository {
    private UserModel: Model<IMongooseUser>;

    // constructor(UserModel: Model<IMongooseUser>) {
    //     this.UserModel = UserModel;
    // }

    constructor(@inject(TYPES.USER_MODEL) UserModel: Model<IMongooseUser>) {
        this.UserModel = UserModel;
    }

    // creation new user
    async create(user: ICleanUser): Promise<IMongooseUser | Error> {
        try {
            const savedUser = await this.UserModel.create({
                Nome: user.nome,
                Cognome: user.cognome,
                Email: user.email,
                Password: user.password,
            });
            if (savedUser) {
                console.log("utente creato con successo.");
                return savedUser;
            } else {
                throw new Error("errore nella creazione dell'utente.");
            }
        } catch (err) {
            console.log(err);
            throw new Error("errore nella creazione dell'utente.");
        }
    }

    // check for duplicate in the DB
    async checkForDuplicate(username: string, email: string, id?: string): Promise<boolean | Error> {
        const duplicateUserByName = await this.UserModel.findOne({ Nome: username });
        const duplicateUserByEmail = await this.UserModel.findOne({ Email: email });

        if (duplicateUserByName && duplicateUserByName._id.toString() !== id) {
            throw new Error("esiste gia un utente con tale nome. cambialo.");
        }
        if (duplicateUserByEmail && duplicateUserByEmail._id.toString() !== id) {
            throw new Error("esiste gia un utente con questa email. modificala.");
        }
        return false;
    }

    // get all users
    async getAllUsers(): Promise<IMongooseUser_no_psw[] | Error> {
        try {
            const allUsers = await this.UserModel.find({ Ruoli: { $ne: "admin" } })
                .select("-Password")
                .exec();
            if (allUsers.length <= 0) {
                throw new Error("nessun utente presente del database.");
            }
            return allUsers;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }

            throw new Error("errore imprevisto.");
        }
    }

    //save edit to user
    async saveUserChanges(data: IUser): Promise<string | Error> {
        try {
            const user = await this.UserModel.findById({ _id: data._id }).exec();
            if (!user) {
                throw new Error("utente non trovato nel database.");
            }
            if (data.nome !== "") {
                user.Nome = data.nome;
            }
            if (data.cognome !== "") {
                user.Cognome = data.cognome;
            }
            if (data.email !== "") {
                user.Email = data.email;
            }
            if (data.password !== "") {
                user.Password = data.password;
            }
            await user.save();
            let msg: string = "utente modificato con successo.";
            return msg;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }

            throw new Error("errore imprevisto.");
        }
    }

    //find a user by given id
    async findById(idUser: string): Promise<IMongooseUserId | Error> {
        try {
            const user = await this.UserModel.findById({ _id: idUser });
            if (!user) {
                throw new Error("utente non trovato con id fornito.");
            }
            return user;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore durante la ricerca tramite id dello user.  userRepository - find by Id");
        }
    }

    // change status user (IsActive) : boolean
    async changeStatus(user: IUser): Promise<Error | string> {
        const userDb = await this.UserModel.findById({ _id: user._id });
        if (!userDb) {
            throw new Error("impossibile trovare l'utente per modificarne lo status...");
        }

        userDb.IsActive = user.isActive;
        await userDb.save();
        const msg = "status utente modificato con successo.";
        return msg;
    }

    async findByEmail(email: string): Promise<Error | IMongooseUserId> {
        try {
            const user = await this.UserModel.findOne({ Email: email.trim() });
            if (!user) {
                throw new Error("nessun utente trovato associato alla mail fornita.");
            }
            return user;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante la ricerca dell utente tramite email.");
        }
    }

    async change_User_Password(user: IMongooseUserId, newPassword: string): Promise<Error | IMongooseUserId> {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPsw = bcrypt.hashSync(newPassword, salt);

            // findOneAndUpdate(filter, update, options, callback) metodo findOneAndUpdate accetta un filtro per specficiare i criteri di ricerca, un valore con cui aggironare un campo e un options, non obbligatorio, coptions (opzionale): Un oggetto che specifica le opzioni per l'operazione di aggiornamento. Alcune opzioni comuni includono:
            // new: Se impostato a true, restituisce il documento aggiornato. Il valore predefinito è false, il che significa che viene restituito il documento originale.
            // upsert: Se impostato a true, crea un nuovo documento se non ne viene trovato uno che corrisponde ai criteri di ricerca.
            // runValidators: Se impostato a true, esegue i validatori del modello durante l'aggiornamento.
            // callback (opzionale): Una funzione di callback che viene eseguita al termine dell'operazione.
            const modifiedUser = await this.UserModel.findOneAndUpdate(
                { _id: user._id },
                { Password: hashedPsw },
                { new: true }
            );

            if (!modifiedUser) {
                throw new Error("impossibile trovare utente per aggiornare la password.");
            }
            return modifiedUser;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante l'aggiornamento della password dell'utente.");
        }
    }
}

export { UserRepository };
