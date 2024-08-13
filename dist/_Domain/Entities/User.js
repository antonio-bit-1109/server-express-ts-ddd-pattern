"use strict";
// le entità sono sono i "modelli fondamentali dell applicazione"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//USER - ENTITà FONDAMENTALE  E CON SPECIFICHE PROPRIETà
const NomeUser_js_1 = __importDefault(require("../ValueObjects/NomeUser.js"));
const CognomeUser_js_1 = __importDefault(require("../ValueObjects/CognomeUser.js"));
const EmailUser_js_1 = __importDefault(require("../ValueObjects/EmailUser.js"));
const PasswordUser_js_1 = __importDefault(require("../ValueObjects/PasswordUser.js"));
class User {
    nome;
    cognome;
    email;
    password;
    constructor(nome, cognome, email, password) {
        try {
            this.nome = new NomeUser_js_1.default(nome);
            this.cognome = new CognomeUser_js_1.default(cognome);
            this.email = new EmailUser_js_1.default(email);
            this.password = new PasswordUser_js_1.default(password);
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
}
exports.default = User;
