"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutoreBook_1 = __importDefault(require("../ValueObjects/Book/AutoreBook"));
const CopertinaRiginaBook_1 = __importDefault(require("../ValueObjects/Book/CopertinaRiginaBook"));
const NomeBook_1 = __importDefault(require("../ValueObjects/Book/NomeBook"));
const PagineBook_1 = __importDefault(require("../ValueObjects/Book/PagineBook"));
const PrezzoBook_1 = __importDefault(require("../ValueObjects/Book/PrezzoBook"));
const TematicaBook_1 = __importDefault(require("../ValueObjects/Book/TematicaBook"));
class book {
    // private autore : AutoreBook
    nome;
    prezzo;
    autore;
    pagine;
    copertinaRigida;
    tematica;
    constructor(nome, prezzo, autore, pagine, copertinaRigida, tematica) {
        this.nome = new NomeBook_1.default(nome);
        this.prezzo = new PrezzoBook_1.default(prezzo);
        this.autore = new AutoreBook_1.default(autore);
        this.pagine = new PagineBook_1.default(pagine);
        this.copertinaRigida = new CopertinaRiginaBook_1.default(copertinaRigida);
        this.tematica = new TematicaBook_1.default(tematica);
    }
}
exports.default = book;
