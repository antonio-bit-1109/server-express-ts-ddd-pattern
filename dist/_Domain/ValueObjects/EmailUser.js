"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailUser {
    email;
    constructor(email) {
        this.email = this.validate(email);
    }
    // Metodo privato per la validazione dell'email
    validate(email) {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return email;
        }
        throw new Error("fallimento validazione email. email deve essere nel formato aaa@aaa.it/.com");
    }
    getValue() {
        return this.email;
    }
}
exports.default = EmailUser;
