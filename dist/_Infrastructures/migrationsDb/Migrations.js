"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        console.log(err);
    }
}
exports.default = { Add_CampoPassword_to_User };
