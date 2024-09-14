"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class PasswordUser {
    // tipizzazione della proprietà della classe
    password;
    // tipizzazione del parametro passato al costruttore
    constructor(password, method) {
        const hashedPassword = this.validate(password, method);
        if (!hashedPassword && hashedPassword !== "") {
            throw new Error("errore durante la validazione della password.");
        }
        else {
            this.password = hashedPassword;
        }
    }
    validate(password, method) {
        if (method === "EDIT" && password === "") {
            return "";
        }
        // se la password risulta gia hashata la ritorno immediatamente
        // if (this.IsHashed(password)) {
        //     return password;
        // }
        if (this.minLength(password)) {
            const lowerChar = this.makeLower(password);
            return this.hashPassword(lowerChar);
        }
    }
    minLength(password) {
        if (password.length >= 10) {
            return true;
        }
        throw new Error("password troppo corta. deve essere lunga almeno 10 caratteri");
    }
    hashPassword(password) {
        try {
            return bcryptjs_1.default.hashSync(password, 10);
        }
        catch (err) {
            throw new Error("Errore durante l'hashing della password.");
        }
    }
    makeLower(password) {
        return password.toLowerCase();
    }
    getValue() {
        return this.password;
    }
}
exports.default = PasswordUser;
