"use strict";
// // import UserModel from "../../_Infrastructures/database/models/UserModel";
// import {
//    DataCreateUser,
//    DTO_Data_User_Edit,
//    ICleanUser,
//    IMongooseUser,
//    IUser,
//    IUserRepository,
// } from "../../interfaces/interfaces";
// import User from "../Entities/User";
// import UserRepository from "../Repositories/UserRepository";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.BookServices = void 0;
const inversify_1 = require("inversify");
const Book_1 = __importDefault(require("../Entities/Book"));
const types_1 = require("../../_dependency_inject/types");
const cheerio = __importStar(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const utilityFunctions_1 = require("../../utils/utilityFunctions");
let BookServices = class BookServices {
    bookRepository; // Attributo della classe
    // constructor(bookRepository: IBookRepository) {
    //     // Costruttore
    //     this.bookRepository = bookRepository; // Iniezione della dipendenza
    // }
    constructor(bookRepository_DEPEND) {
        this.bookRepository = bookRepository_DEPEND;
    }
    // tutta la logica di business scritta qui dentro
    async createBook(data) {
        try {
            //1- valido i dati in entrata nel controller per garantire che rispecchinole validazioni inserite nel valueObject
            const book = new Book_1.default(data.nomeLibro, data.prezzoLibro, data.autoreLibro, data.pagine, data.isCopertinaRigida, data.tematica, "CREATE"
            // data.imgCopertina
            );
            const cleanBook = book.clean();
            if (cleanBook.nomeBook !== null && cleanBook.autoreBook !== null) {
                const isDuplicate = await this.bookRepository.checkForDuplicate(cleanBook.nomeBook, cleanBook.autoreBook);
                if (isDuplicate instanceof Error) {
                    throw isDuplicate;
                }
            }
            const esito = await this.bookRepository.save(cleanBook);
            if (esito instanceof Error) {
                throw esito;
            }
            else {
                const msg = "libro creato con successo.";
                return msg;
            }
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore nel servizio Book Services");
        }
        //logica per la creazione di un book
    }
    async handleGetAllBooks() {
        try {
            const books = await this.bookRepository.getAllBooks();
            if (books instanceof Error) {
                throw books;
            }
            return books;
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore nel servizio getAllBooks" + err);
        }
    }
    async handleEditBook(data) {
        try {
            if (data.titolo !== "" || data.autore !== "") {
                const resultDuplicate = await this.bookRepository.checkForDuplicate(data.titolo, data.autore);
                if (resultDuplicate instanceof Error) {
                    throw resultDuplicate;
                }
            }
            const book = new Book_1.default(data.titolo, data.prezzo, data.autore, data.numPagine, data.copertinaRigida, data.tema, "EDIT"
            // ""
            );
            console.log(book);
            const modifiedBook = book.cleanWithId(data.id);
            console.log(modifiedBook);
            const result = await this.bookRepository.saveEditedBook(modifiedBook);
            if (result instanceof Error) {
                throw result;
            }
            return result;
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante la modifica del libro HandleEdit book - BookServices");
        }
    }
    async handleEditBookImg(imgFile, id) {
        try {
            const book = await this.bookRepository.findById(id);
            if (book instanceof Error) {
                throw book;
            }
            book.ImgCopertina = imgFile.filename;
            const result = await book.save();
            if (result instanceof Error) {
                throw result;
            }
            let msg = "immagine aggiornata con successo.";
            return msg;
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante la modifica del libro HandleEdit book - BookServices");
        }
    }
    async handleWebScrapingSite() {
        try {
            const URL = "https://it.wikipedia.org/wiki/I_Gatti_di_Vicolo_Miracoli";
            const response = await axios_1.default.get(URL);
            const cssTag = cheerio.load(response.data);
            const textInTag = cssTag("p")
                .map((i, el) => cssTag(el).text())
                .get();
            // console.log(textInTag);
            const result = (0, utilityFunctions_1.handleStringInArray)(textInTag);
            return result;
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante il web scraping - BookServices --- handleWebScrapingSite");
        }
    }
};
exports.BookServices = BookServices;
exports.BookServices = BookServices = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.BOOK_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], BookServices);
