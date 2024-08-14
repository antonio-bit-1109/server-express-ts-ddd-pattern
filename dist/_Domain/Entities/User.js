"use strict";
// le entità sono sono i "modelli fondamentali dell applicazione"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//USER - ENTITà FONDAMENTALE  E CON SPECIFICHE PROPRIETà
const NomeUser_1 = __importDefault(require("../ValueObjects/NomeUser"));
const CognomeUser_1 = __importDefault(require("../ValueObjects/CognomeUser"));
const EmailUser_1 = __importDefault(require("../ValueObjects/EmailUser"));
const PasswordUser_1 = __importDefault(require("../ValueObjects/PasswordUser"));
const mongodb_1 = require("mongodb");
class User {
    nome;
    cognome;
    email;
    password;
    constructor(nome, cognome, email, password, method) {
        try {
            this.nome = new NomeUser_1.default(nome, method);
            this.cognome = new CognomeUser_1.default(cognome, method);
            this.email = new EmailUser_1.default(email, method);
            this.password = new PasswordUser_1.default(password, method);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            else {
                throw new Error("errore sconosciuto.");
            }
        }
    }
    Clean() {
        return {
            nome: this.nome.getValue(),
            cognome: this.cognome.getValue(),
            email: this.email.getValue(),
            password: this.password.getValue(),
        };
    }
    CleanWithId(id) {
        return {
            _id: new mongodb_1.ObjectId(id),
            nome: this.nome.getValue(),
            cognome: this.cognome.getValue(),
            email: this.email.getValue(),
            password: this.password.getValue(),
        };
    }
}
exports.default = User;
