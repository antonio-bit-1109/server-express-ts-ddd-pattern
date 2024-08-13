"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordUser {
    // tipizzazione della proprietà della classe
    password;
    // tipizzazione del parametro passato al costruttore
    constructor(password) {
        const hashedPassword = this.validate(password);
        if (!hashedPassword) {
            throw new Error("errore durante la validazione della password.");
        }
        this.password = hashedPassword;
    }
    validate(password) {
        if (this.minLength(password)) {
            return this.hashPassword(password);
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
            return bcrypt_1.default.hashSync(password, 10);
        }
        catch (err) {
            throw new Error("Errore durante l'hashing della password.");
        }
    }
    getValue() {
        return this.password;
    }
}
exports.default = PasswordUser;
