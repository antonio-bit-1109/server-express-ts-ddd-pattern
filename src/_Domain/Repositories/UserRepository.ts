import { Model } from "mongoose";
import { ICleanUser, IMongooseUser, IUser } from "../../interfaces/interfaces";
// import UserModel from "../../_Infrastructures/database/models/UserModel";

class UserRepository {
    private UserModel: Model<IMongooseUser>;

    constructor(UserModel: Model<IMongooseUser>) {
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
    async getAllUsers(): Promise<IMongooseUser[] | Error> {
        try {
            const allUsers = await this.UserModel.find().exec();
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
    async findById(idUser: string): Promise<IMongooseUser | Error> {
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
            throw new Error("errore imprevisto.");
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
}

export default UserRepository;
