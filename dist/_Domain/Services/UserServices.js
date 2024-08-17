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
            const user = new User_1.default(data.nome, data.cognome, data.email, data.password, "CREATE");
            const cleanUser = user.Clean();
            const duplicateFound = await this.userRepository.checkForDuplicate(cleanUser.nome, cleanUser.email);
            if (!duplicateFound) {
                const savedUser = await this.userRepository.create(cleanUser);
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
    async takeAllUsers() {
        try {
            const allUsers = await this.userRepository.getAllUsers();
            if (allUsers) {
                return allUsers;
            }
            throw new Error("impossibile ricavare tutti gli utenti");
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore sconosciuto.");
        }
    }
    async EditUser(data) {
        try {
            // passo il body ricevuto dal client alla classe User + valueObject dello user per la validazione dei dati
            const editedUser = new User_1.default(data.nome, data.cognome, data.email, data.password, "EDIT");
            console.log(editedUser);
            const cleanObj = editedUser.CleanWithId(data._id);
            console.log(cleanObj);
            // se l oggetto ritornato con i dati dei campi che l utente vuole modificare contengono un nome e email valida, mi assicuro che non sia gia presente u utente con quei valori di nome ed email
            if (cleanObj.nome !== "" || cleanObj.email !== "") {
                const duplicate = await this.userRepository.checkForDuplicate(cleanObj.nome, cleanObj.email, cleanObj._id.toString());
                if (duplicate instanceof Error) {
                    throw new Error(duplicate.message);
                }
            }
            const esitoSave = await this.userRepository.saveUserChanges(cleanObj);
            return esitoSave;
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore sconosciuto.");
        }
    }
    async changeStatus(status, id) {
        try {
            const userFromDb = await this.userRepository.findById(id);
            if (userFromDb instanceof Error) {
                throw new Error("errore durante il reperimento dell'utente dal database.");
            }
            if (userFromDb.IsActive === status) {
                throw new Error("lo status fornito è uguale a quello corrente.");
            }
            const user = new User_1.default(userFromDb.Nome, userFromDb.Cognome, userFromDb.Email, userFromDb.Password, "STATUS", status);
            const cleanedUser = user.CleanWithId(id);
            console.log(cleanedUser);
            const changeStatusDb = await this.userRepository.changeStatus(cleanedUser);
            return changeStatusDb;
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore sconosciuto");
        }
    }
}
exports.default = UserServices;
