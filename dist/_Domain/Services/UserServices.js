"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserServices {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async creaNuovoUser(id, nome, cognome, email) { }
    async cambiaNomeUtente(id, nuovoNome) { }
    async cambiaCognomeUtente(id, nuovoNome) { }
}
exports.default = UserServices;
