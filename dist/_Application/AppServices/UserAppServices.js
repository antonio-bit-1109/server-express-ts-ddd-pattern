"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_mjs_1 = __importDefault(require("../../_Domain/Entities/User.mjs"));
const UserRepository_js_1 = __importDefault(require("../../_Domain/Repositories/UserRepository.js"));
const userRepository = new UserRepository_js_1.default();
// oggetto contenente metodi per "maneggiare" lo user.
const UserAppService = {
    createUser: async (userData) => {
        //creo un oggetto User a partire dall istanza dell entità User.
        try {
            const user = new User_mjs_1.default(userData.nome, userData.cognome, userData.email, userData.password);
            console.log(user);
            const cleanUser = user.Clean();
            console.log(cleanUser);
            await userRepository.checkForDuplicate(cleanUser.nome, cleanUser.email);
            const savedUser = await userRepository.Save(cleanUser);
            return savedUser;
        }
        catch (err) {
            throw new Error(err);
        }
    },
};
exports.default = UserAppService;
