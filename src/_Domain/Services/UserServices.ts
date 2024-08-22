// import UserModel from "../../_Infrastructures/database/models/UserModel";
import {
    DataCreateUser,
    DTO_Data_User_Edit,
    ICleanUser,
    IMongooseUser,
    IMongooseUserId,
    IUser,
    IUserRepository,
} from "../../interfaces/interfaces";
import User from "../Entities/User";
import { TYPES } from "../../_dependency_inject/types";
import { injectable, inject } from "inversify";
import { UserRepository } from "../Repositories/UserRepository";

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
            const user = new User(data.nome, data.cognome, data.email, data.password, "CREATE");
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

    public async takeAllUsers(): Promise<IMongooseUser[] | Error> {
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
            const editedUser = new User(data.nome, data.cognome, data.email, data.password, "EDIT");
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
                status
            );
            const cleanedUser: IUser = user.CleanWithId(id);
            console.log(cleanedUser);
            const changeStatusDb = await this.userRepository.changeStatus(cleanedUser);
            return changeStatusDb;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }

            throw new Error("errore sconosciuto");
        }
    }
}

export { UserServices };
