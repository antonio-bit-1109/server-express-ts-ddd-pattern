import UserModel from "../../_Infrastructures/database/models/UserModel";
import {
    DataCreateUser,
    DTO_Data_User_Edit,
    EditUserData,
    ICleanUser,
    IMongooseUser,
    IUser,
    IUserRepository,
} from "../../interfaces/interfaces";
import User from "../Entities/User";
import UserRepository from "../Repositories/UserRepository";

class UserServices {
    private userRepository: IUserRepository; // Attributo della classe

    constructor(userRepository: IUserRepository) {
        // Costruttore
        this.userRepository = userRepository; // Iniezione della dipendenza
    }

    public async createUser(data: DataCreateUser): Promise<IMongooseUser | Error | null> {
        try {
            //logica di creazione dell'utente
            const user = new User(data.nome, data.cognome, data.email, data.password, "CREATE");
            const cleanUser: ICleanUser = user.Clean();
            const duplicateFound = await this.userRepository.checkForDuplicate(cleanUser.nome, cleanUser.email);
            if (!duplicateFound) {
                const savedUser = await this.userRepository.Save(cleanUser);
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
}

// export default UserServices;
//  export const userServices = new UserServices(userRepository);
export default UserServices;
