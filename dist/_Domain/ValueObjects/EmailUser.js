"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailUser {
    constructor(email) {
        // if (!this.validate(email)) {
        //     throw new Error("formato email non valido. devi usare un formato   aaa@aaa.it/com");
        // }
        this.email = this.validate(email);
    }
    // Metodo privato per la validazione dell'email
    validate(email) {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return email;
        }
        throw new Error("fallimento validazione email. email deve essere nel formato aaa@aaa.it/.com");
    }
}
exports.default = EmailUser;
