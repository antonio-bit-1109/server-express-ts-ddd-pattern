"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import UserModel from "../../_Infrastructures/database/models/UserModel";
class BookRepository {
    BookModel;
    constructor(BookModel) {
        this.BookModel = BookModel;
    }
    //prettier-ignore
    async createBook(data) {
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
}
exports.default = BookRepository;
