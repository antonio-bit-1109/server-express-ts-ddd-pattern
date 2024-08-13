"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../Entities/User"));
// import UserRepository from "../Repositories/UserRepository";
class UserServices {
    userRepository; // Attributo della classe
    constructor(userRepository) {
        // Costruttore
        this.userRepository = userRepository; // Iniezione della dipendenza
    }
    async createUser(data) {
        try {
            //logica di creazione dell'utente
            const user = new User_1.default(data.nome, data.cognome, data.email, data.password);
            const cleanUser = user.Clean();
            const duplicateFound = await this.userRepository.checkForDuplicate(cleanUser.nome, cleanUser.email);
            if (!duplicateFound) {
                const savedUser = await this.userRepository.Save(cleanUser);
                return savedUser;
            }
            throw new Error("trovato user duplicato. prova cambiando nome o email.");
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore sconosciuto.");
        }
    }
}
// export default UserServices;
//  export const userServices = new UserServices(userRepository);
exports.default = UserServices;
