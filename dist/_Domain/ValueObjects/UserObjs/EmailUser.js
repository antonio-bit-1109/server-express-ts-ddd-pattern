"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailUser {
    email;
    constructor(email, method) {
        this.email = this.validate(email, method);
    }
    // Metodo privato per la validazione dell'email
    validate(email, method) {
        if (method === "EDIT") {
            if (email === "") {
                return "";
            }
        }
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const lowerChar = this.makeLower(email);
            return lowerChar;
        }
        throw new Error("fallimento validazione email. email deve essere nel formato aaa@aaa.it/.com");
    }
    makeLower(email) {
        return email.toLowerCase();
    }
    getValue() {
        return this.email;
    }
}
exports.default = EmailUser;
