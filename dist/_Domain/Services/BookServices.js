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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = __importDefault(require("../Entities/Book"));
class BookServices {
    bookRepository; // Attributo della classe
    constructor(bookRepository) {
        // Costruttore
        this.bookRepository = bookRepository; // Iniezione della dipendenza
    }
    // tutta la logica di business scritta qui dentro
    async createBook(data) {
        try {
            //1- valido i dati in entrata nel controller per garantire che rispecchinole validazioni inserite nel valueObject
            const book = new Book_1.default(data.nomeLibro, data.prezzoLibro, data.autoreLibro, data.pagine, data.isCopertinaRigida, data.tematica, data.imgCopertina);
            const cleanBook = book.clean();
            const isDuplicate = await this.bookRepository.checkForDuplicate(cleanBook.nomeBook, cleanBook.autoreBook);
            if (isDuplicate instanceof Error) {
                throw isDuplicate;
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
}
exports.default = BookServices;
