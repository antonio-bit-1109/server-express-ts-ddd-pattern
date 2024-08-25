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
exports.BookRepository = void 0;
const mongoose_1 = require("mongoose");
const inversify_1 = require("inversify");
const types_1 = require("../../_dependency_inject/types");
// import UserModel from "../../_Infrastructures/database/models/UserModel";
let BookRepository = class BookRepository {
    BookModel;
    // constructor(BookModel: Model<IMoongooseBook>) {
    //     this.BookModel = BookModel;
    // }
    constructor(bookModel) {
        this.BookModel = bookModel;
    }
    //prettier-ignore
    async save(data) {
        try {
            const savedBook = await this.BookModel.create({
                NomeLibro: data.nomeBook,
                PrezzoLibro: data.prezzoBook,
                Autore: data.autoreBook,
                PagineLibro: data.pagineBook,
                CopertinaRigida: data.isCopertinaRigida,
                TematicaLibro: data.tematica
            });
            if (!savedBook) {
                throw new Error("creazione del libro fallita. BookRepository - createBook");
            }
            return savedBook;
        }
        catch (err) {
            return new Error(`Errore nel repository durante la creazione del libro: ${err}`);
        }
    }
    async checkForDuplicate(titoloLibro, autore) {
        try {
            const duplicateBook = await this.BookModel.findOne({
                NomeLibro: { $regex: new RegExp(`^${titoloLibro}$`, "i") },
                Autore: { $regex: new RegExp(`^${autore}$`, "i") },
            }).exec();
            if (duplicateBook) {
                return new Error("esiste gia un libro con questo titolo e autore del database.");
            }
        }
        catch (err) {
            throw new Error("errore durante il controllo del duplicato nel db. Book Repository");
        }
    }
    async getAllBooks() {
        try {
            const books = await this.BookModel.find().exec();
            return books;
        }
        catch (err) {
            throw new Error(` ERRORE : ${err} - durante il reperimetno di tutti i libri dal repository - bookRepository.ts`);
        }
    }
    async saveEditedBook(bookPARAM) {
        try {
            const book = await this.BookModel.findOne({ _id: bookPARAM._id }).exec();
            if (!book) {
                throw new Error("errore durante il reperimento del libro nel db");
            }
            if (bookPARAM.autoreBook !== "") {
                book.Autore = bookPARAM.autoreBook;
            }
            // if (bookPARAM.imgCopertina !== "") {
            //     book.ImgCopertina = bookPARAM.imgCopertina;
            // }
            if (typeof bookPARAM.isCopertinaRigida === "boolean") {
                book.CopertinaRigida = bookPARAM.isCopertinaRigida;
            }
            if (bookPARAM.nomeBook !== "") {
                book.NomeLibro = bookPARAM.nomeBook;
            }
            if (!isNaN(bookPARAM.pagineBook)) {
                book.PagineLibro = bookPARAM.pagineBook;
            }
            if (!isNaN(bookPARAM.prezzoBook)) {
                book.PrezzoLibro = bookPARAM.prezzoBook;
            }
            if (bookPARAM.tematica !== "") {
                book.TematicaLibro = bookPARAM.tematica;
            }
            await book.save();
            let msg = "modifiche al libro salvate con successo!";
            return msg;
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante il salvataggio delle modifiche al libro selezionato. - Book Repository - saveEditBook");
        }
    }
};
exports.BookRepository = BookRepository;
exports.BookRepository = BookRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.BOOK_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BookRepository);
