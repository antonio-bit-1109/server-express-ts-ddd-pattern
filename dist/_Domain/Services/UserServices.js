"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const User_1 = __importDefault(require("../Entities/User"));
const types_1 = require("../../_dependency_inject/types");
const inversify_1 = require("inversify");
const nodemailer_1 = require("nodemailer");
//  import {} from "nodemailer"
// import UserRepository from "../Repositories/UserRepository";
let UserServices = class UserServices {
    userRepository; // Attributo della classe
    // constructor(userRepository: IUserRepository) {
    //     // Costruttore
    //     this.userRepository = userRepository; // Iniezione della dipendenza
    // }
    constructor(userRepository_DEPEND) {
        this.userRepository = userRepository_DEPEND;
    }
    async createUser(data) {
        try {
            //logica di creazione dell'utente
            const user = new User_1.default(data.nome, data.cognome, data.email, data.password, "CREATE", true, ["utente"]);
            const cleanUser = user.Clean();
            const duplicateFound = await this.userRepository.checkForDuplicate(cleanUser.nome, cleanUser.email);
            if (!duplicateFound) {
                const savedUser = await this.userRepository.create(cleanUser);
                return savedUser;
            }
            throw new Error("trovato user duplicato. prova cambiando nome o email.");
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore sconosciuto.");
        }
    }
    async takeAllUsers() {
        try {
            const allUsers = await this.userRepository.getAllUsers();
            if (allUsers) {
                return allUsers;
            }
            throw new Error("impossibile ricavare tutti gli utenti");
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore sconosciuto.");
        }
    }
    async EditUser(data) {
        try {
            // passo il body ricevuto dal client alla classe User + valueObject dello user per la validazione dei dati
            const editedUser = new User_1.default(data.nome, data.cognome, data.email, data.password, "EDIT", true, data.ruoli);
            console.log(editedUser);
            const cleanObj = editedUser.CleanWithId(data._id);
            console.log(cleanObj);
            // se l oggetto ritornato con i dati dei campi che l utente vuole modificare contengono un nome e email valida, mi assicuro che non sia gia presente u utente con quei valori di nome ed email
            if (cleanObj.nome !== "" || cleanObj.email !== "") {
                const duplicate = await this.userRepository.checkForDuplicate(cleanObj.nome, cleanObj.email, cleanObj._id.toString());
                if (duplicate instanceof Error) {
                    throw new Error(duplicate.message);
                }
            }
            const esitoSave = await this.userRepository.saveUserChanges(cleanObj);
            return esitoSave;
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore sconosciuto.");
        }
    }
    async changeStatus(status, id) {
        try {
            const userFromDb = await this.userRepository.findById(id);
            if (userFromDb instanceof Error) {
                throw new Error("errore durante il reperimento dell'utente dal database.");
            }
            if (userFromDb.IsActive === status) {
                throw new Error("lo status fornito è uguale a quello corrente.");
            }
            const user = new User_1.default(userFromDb.Nome, userFromDb.Cognome, userFromDb.Email, userFromDb.Password, "STATUS", status, userFromDb.Ruoli);
            const cleanedUser = user.CleanWithId(id);
            console.log(cleanedUser);
            const changeStatusDb = await this.userRepository.changeStatus(cleanedUser);
            return changeStatusDb;
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore durante il cambiamento di stato dello user -- userservices , change status");
        }
    }
    async handleResetPsw(email) {
        try {
            //email in formato valido?
            const regexValidForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const result = regexValidForm.test(email);
            if (!result) {
                throw new Error("email fornita non nel formato valido. aaa@aaa.it/com - Errore nello user services");
            }
            // trovo utente associato alla mail
            const user = await this.userRepository.findByEmail(email);
            if (user instanceof Error) {
                throw user;
            }
            const esito = await this.SendEmail(email);
            if (esito instanceof Error) {
                throw esito;
            }
            return esito;
            //se i controlli vengono superati provvedo a creare un metodo per l'invio della mail all email specificata.
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante il reperimento dell utente per il cambio password -- userservices , handleResetPsw");
        }
    }
    async SendEmail(email) {
        const transporter = (0, nodemailer_1.createTransport)();
        let mailOptions = {
            from: "tuoindirizzo@gmail.com", // L'indirizzo del mittente
            to: `${email}`, // L'indirizzo del destinatario
            subject: "Reimpostazione della password", // Oggetto dell'email
            text: "clicca il link sottostante per essere reindirizzato alla pagina di reipostazione della password.", // Corpo dell'email in testo
            // Se desideri inviare HTML, usa il campo 'html' invece di 'text'
            html: "<a>http://localhost:3500</a>",
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(`Errore durante l'invio dell'email: ${error}`);
                throw new Error("Errore durante l'invio dell'email");
            }
            // const msg = "Email inviata con successo"
            console.log(`Email inviata con successo: ${info.response}`);
        });
        const msg = "email inviata con successo";
        return msg;
    }
};
exports.UserServices = UserServices;
exports.UserServices = UserServices = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UserServices);
