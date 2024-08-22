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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const mongoose_1 = require("mongoose");
const inversify_1 = require("inversify");
const types_1 = require("../../_dependency_inject/types");
// import UserModel from "../../_Infrastructures/database/models/UserModel";
let UserRepository = class UserRepository {
    UserModel;
    // constructor(UserModel: Model<IMongooseUser>) {
    //     this.UserModel = UserModel;
    // }
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    // creation new user
    async create(user) {
        try {
            const savedUser = await this.UserModel.create({
                Nome: user.nome,
                Cognome: user.cognome,
                Email: user.email,
                Password: user.password,
            });
            if (savedUser) {
                console.log("utente creato con successo.");
                return savedUser;
            }
            else {
                throw new Error("errore nella creazione dell'utente.");
            }
        }
        catch (err) {
            console.log(err);
            throw new Error("errore nella creazione dell'utente.");
        }
    }
    // check for duplicate in the DB
    async checkForDuplicate(username, email, id) {
        const duplicateUserByName = await this.UserModel.findOne({ Nome: username });
        const duplicateUserByEmail = await this.UserModel.findOne({ Email: email });
        if (duplicateUserByName && duplicateUserByName._id.toString() !== id) {
            throw new Error("esiste gia un utente con tale nome. cambialo.");
        }
        if (duplicateUserByEmail && duplicateUserByEmail._id.toString() !== id) {
            throw new Error("esiste gia un utente con questa email. modificala.");
        }
        return false;
    }
    // get all users
    async getAllUsers() {
        try {
            const allUsers = await this.UserModel.find().exec();
            if (allUsers.length <= 0) {
                throw new Error("nessun utente presente del database.");
            }
            return allUsers;
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore imprevisto.");
        }
    }
    //save edit to user
    async saveUserChanges(data) {
        try {
            const user = await this.UserModel.findById({ _id: data._id }).exec();
            if (!user) {
                throw new Error("utente non trovato nel database.");
            }
            if (data.nome !== "") {
                user.Nome = data.nome;
            }
            if (data.cognome !== "") {
                user.Cognome = data.cognome;
            }
            if (data.email !== "") {
                user.Email = data.email;
            }
            if (data.password !== "") {
                user.Password = data.password;
            }
            await user.save();
            let msg = "utente modificato con successo.";
            return msg;
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore imprevisto.");
        }
    }
    //find a user by given id
    async findById(idUser) {
        try {
            const user = await this.UserModel.findById({ _id: idUser });
            if (!user) {
                throw new Error("utente non trovato con id fornito.");
            }
            return user;
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("errore imprevisto.");
        }
    }
    // change status user (IsActive) : boolean
    async changeStatus(user) {
        const userDb = await this.UserModel.findById({ _id: user._id });
        if (!userDb) {
            throw new Error("impossibile trovare l'utente per modificarne lo status...");
        }
        userDb.IsActive = user.isActive;
        await userDb.save();
        const msg = "status utente modificato con successo.";
        return msg;
    }
    async findByEmail(email) {
        try {
            const user = await this.UserModel.findOne({ Email: email.trim() });
            if (!user) {
                throw new Error("nessun utente trovato.");
            }
            return user;
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante la ricerca dell utente tramite email.");
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.USER_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserRepository);
