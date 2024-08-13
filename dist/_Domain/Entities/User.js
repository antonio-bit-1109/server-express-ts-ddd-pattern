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
    constructor(nome, cognome, email, password) {
        // this.id = id;
        try {
            this.nome = new NomeUser_js_1.default(nome);
            this.cognome = new CognomeUser_js_1.default(cognome);
            this.email = new EmailUser_js_1.default(email);
            this.password = new PasswordUser_js_1.default(password);
        }
        catch (err) {
            throw new Error(err);
        }
    }
    Clean() {
        return {
            nome: this.nome.nome,
            cognome: this.cognome.cognome,
            email: this.email.email,
            password: this.password.password,
        };
    }
}
exports.default = User;
