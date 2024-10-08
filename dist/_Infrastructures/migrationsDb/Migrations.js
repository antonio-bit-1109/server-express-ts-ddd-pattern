"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookModel_1 = __importDefault(require("../database/models/BookModel"));
const UserModel_1 = __importDefault(require("../database/models/UserModel"));
async function Add_CampoPassword_to_User() {
    try {
        console.log("migrazione in corso...");
        console.log("aggiunta campo password allo user...");
        const result = await UserModel_1.default.updateMany({ Password: { $exists: false } }, { $set: { Password: "defaultPassword" } });
        if (result) {
            console.log("migrazione eseguita.");
        }
    }
    catch (err) {
        console.log(`errore durante la migrazione: ${err}`);
    }
}
async function addCampoIsActive_To__User() {
    try {
        console.log("migrazione in corso...");
        console.log("aggiunta campo is_Active all'utente...");
        const result = await UserModel_1.default.updateMany({ IsActive: { $exists: false } }, { $set: { IsActive: true } });
        if (result) {
            console.log("migrazione eseguita.");
        }
    }
    catch (err) {
        console.log(`errore durante la migrazione: ${err}`);
    }
}
async function addCampo_ImgCopertina_to_book_model() {
    try {
        console.log("migrazione in corso...");
        console.log("aggiunta campo img_copertina al book model...");
        const result = await BookModel_1.default.updateMany({ ImgCopertina: { $exists: false } }, { $set: { ImgCopertina: "default.gif" } });
        if (result) {
            console.log("migrazione eseguita.");
        }
    }
    catch (err) {
        console.log(`errore durante la migrazione: ${err}`);
    }
}
async function add_Ruoli_to_userModel() {
    try {
        console.log("migrazione in corso...");
        console.log("aggiunta campo ruoli al user model...");
        const result = await UserModel_1.default.updateMany({ Ruoli: { $exists: false } }, { $set: { Ruoli: ["utente"] } });
        if (result) {
            console.log("migrazione eseguita.");
        }
    }
    catch (err) {
        console.log(`errore durante la migrazione: ${err}`);
    }
}
exports.default = {
    Add_CampoPassword_to_User,
    addCampoIsActive_To__User,
    addCampo_ImgCopertina_to_book_model,
    add_Ruoli_to_userModel,
};
