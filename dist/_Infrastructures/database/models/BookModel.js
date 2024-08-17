"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    NomeLibro: {
        type: String,
        required: true,
    },
    PrezzoLibro: {
        type: Number,
        required: true,
    },
    Autore: {
        type: String,
        required: true,
    },
    PagineLibro: {
        type: Number,
        required: true,
    },
    CopertinaRigida: {
        type: Boolean,
        required: true,
    },
    TematicaLibro: {
        type: String,
        required: true,
    },
});
const BookModel = mongoose_1.default.model("BookModel", bookSchema);
exports.default = BookModel;
