"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutoreBook_1 = __importDefault(require("../ValueObjects/BookObjs/AutoreBook"));
const CopertinaRiginaBook_1 = __importDefault(require("../ValueObjects/BookObjs/CopertinaRiginaBook"));
const NomeBook_1 = __importDefault(require("../ValueObjects/BookObjs/NomeBook"));
const PagineBook_1 = __importDefault(require("../ValueObjects/BookObjs/PagineBook"));
const PrezzoBook_1 = __importDefault(require("../ValueObjects/BookObjs/PrezzoBook"));
const TematicaBook_1 = __importDefault(require("../ValueObjects/BookObjs/TematicaBook"));
const mongodb_1 = require("mongodb");
class Book {
    // private autore : AutoreBook
    nomeBook;
    prezzoBook;
    autoreBook;
    pagineBook;
    copertinaRigida;
    tematicaBook;
    /*    private imgCopertina: string; */
    constructor(nome, prezzo, autore, pagine, copertinaRigida, tematica, method
    // imgCopertina: string
    ) {
        this.nomeBook = new NomeBook_1.default(nome, method);
        this.prezzoBook = new PrezzoBook_1.default(prezzo, method);
        this.autoreBook = new AutoreBook_1.default(autore, method);
        this.pagineBook = new PagineBook_1.default(pagine, method);
        this.copertinaRigida = new CopertinaRiginaBook_1.default(copertinaRigida, method);
        this.tematicaBook = new TematicaBook_1.default(tematica, method);
        /*         this.imgCopertina = imgCopertina; /* new ImmagineCopertinaBook(imgCopertina); */
    }
    clean() {
        return {
            nomeBook: this.nomeBook.getValue(),
            prezzoBook: this.prezzoBook.getValue(),
            autoreBook: this.autoreBook.getValue(),
            pagineBook: this.pagineBook.getValue(),
            isCopertinaRigida: this.copertinaRigida.getValue(),
            tematica: this.tematicaBook.getValue(),
            // imgCopertina: this.imgCopertina.toString(),
        };
    }
    cleanWithId(id) {
        return {
            _id: new mongodb_1.ObjectId(id),
            nomeBook: this.nomeBook.getValue(),
            prezzoBook: this.prezzoBook.getValue(),
            autoreBook: this.autoreBook.getValue(),
            pagineBook: this.pagineBook.getValue(),
            isCopertinaRigida: this.copertinaRigida.getValue(),
            tematica: this.tematicaBook.getValue(),
            // imgCopertina: this.imgCopertina.toString(),
        };
    }
}
exports.default = Book;
