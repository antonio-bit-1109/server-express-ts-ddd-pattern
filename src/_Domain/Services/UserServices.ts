import UserModel from "../../_Infrastructures/database/models/UserModel";
import { DataCreateUser, ICleanUser, IMongooseUser, IUser, IUserRepository } from "../../interfaces/interfaces";
import User from "../Entities/User";
import UserRepository from "../Repositories/UserRepository";
// import UserRepository from "../Repositories/UserRepository";

class UserServices {
    private userRepository: IUserRepository; // Attributo della classe

    constructor(userRepository: IUserRepository) {
        // Costruttore
        this.userRepository = userRepository; // Iniezione della dipendenza
    }

    public async createUser(data: DataCreateUser): Promise<IMongooseUser | Error | null> {
        try {
            //logica di creazione dell'utente
            const user = new User(data.nome, data.cognome, data.email, data.password);
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
}

// export default UserServices;
//  export const userServices = new UserServices(userRepository);
export default UserServices;
