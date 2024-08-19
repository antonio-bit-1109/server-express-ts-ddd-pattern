"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import UserModel from "../../_Infrastructures/database/models/UserModel";
class BookRepository {
    BookModel;
    constructor(BookModel) {
        this.BookModel = BookModel;
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
}
exports.default = BookRepository;
