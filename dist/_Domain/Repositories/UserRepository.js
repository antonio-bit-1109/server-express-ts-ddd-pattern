"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import UserModel from "../../_Infrastructures/database/models/UserModel";
class UserRepository {
    UserModel;
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async Save(user) {
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
            }
            else {
                throw new Error("errore nella creazione dell'utente.");
            }
        }
        catch (err) {
            console.log(err);
            throw new Error("errore nella creazione dell'utente.");
        }
    }
    async checkForDuplicate(username, email) {
        const duplicateUserByName = await this.UserModel.findOne({ Nome: username });
        const duplicateUserByEmail = await this.UserModel.findOne({ Email: email });
        if (duplicateUserByName) {
            throw new Error("esiste gia un utente con tale nome. cambialo.");
        }
        if (duplicateUserByEmail) {
            throw new Error("esiste gia un utente con questa email. modificala.");
        }
        return false;
    }
}
exports.default = UserRepository;
// export const userRepository = new UserRepository(UserModel);
