import { Model } from "mongoose";
import { IcleanBook, IModifiedBook, IMoongooseBook } from "../../interfaces/interfaces";
import { inject, injectable } from "inversify";
import { TYPES } from "../../_dependency_inject/types";
import Book from "../Entities/Book";
import BookModel from "../../_Infrastructures/database/models/BookModel";
// import UserModel from "../../_Infrastructures/database/models/UserModel";

@injectable()
class BookRepository {
    private BookModel: Model<IMoongooseBook>;

    // constructor(BookModel: Model<IMoongooseBook>) {
    //     this.BookModel = BookModel;
    // }

    constructor(@inject(TYPES.BOOK_MODEL) bookModel: Model<IMoongooseBook>) {
        this.BookModel = bookModel;
    }

    //prettier-ignore
    async save(data :IcleanBook) :  Promise<Error | IMoongooseBook> {

        try {
          const savedBook = await this.BookModel.create({
            NomeLibro : data.nomeBook , 
            PrezzoLibro : data.prezzoBook,
            Autore : data.autoreBook , 
            PagineLibro : data.pagineBook , 
            CopertinaRigida : data.isCopertinaRigida, 
            TematicaLibro : data.tematica
        })
        if (!savedBook){
            throw new Error("creazione del libro fallita. BookRepository - createBook")
        }

        return savedBook  
        } catch (err) {
            return new Error(`Errore nel repository durante la creazione del libro: ${err}`);
        }
        
    }

    async checkForDuplicate(titoloLibro: string, autore: string): Promise<Error | void> {
        try {
            const duplicateBook = await this.BookModel.findOne({
                NomeLibro: { $regex: new RegExp(`^${titoloLibro}$`, "i") },
                Autore: { $regex: new RegExp(`^${autore}$`, "i") },
            }).exec();

            if (duplicateBook) {
                return new Error("esiste gia un libro con questo titolo e autore del database.");
            }
        } catch (err) {
            throw new Error("errore durante il controllo del duplicato nel db. Book Repository");
        }
    }

    async getAllBooks(): Promise<IMoongooseBook[] | Error> {
        try {
            const books = await this.BookModel.find().exec();
            return books;
        } catch (err) {
            throw new Error(
                ` ERRORE : ${err} - durante il reperimento di tutti i libri dal repository - bookRepository.ts`
            );
        }
    }

    async saveEditedBook(bookPARAM: IModifiedBook): Promise<Error | string> {
        try {
            const book = await this.BookModel.findOne({ _id: bookPARAM._id }).exec();
            if (!book) {
                throw new Error("errore durante il reperimento del libro nel db");
            }
            if (bookPARAM.autoreBook !== null) {
                book.Autore = bookPARAM.autoreBook;
            }
            // if (bookPARAM.imgCopertina !== "") {
            //     book.ImgCopertina = bookPARAM.imgCopertina;
            // }
            if (typeof bookPARAM.isCopertinaRigida === "boolean") {
                book.CopertinaRigida = bookPARAM.isCopertinaRigida;
            }
            if (bookPARAM.nomeBook !== null) {
                book.NomeLibro = bookPARAM.nomeBook;
            }
            if (bookPARAM.pagineBook !== null) {
                book.PagineLibro = bookPARAM.pagineBook;
            }
            if (bookPARAM.prezzoBook !== null) {
                book.PrezzoLibro = bookPARAM.prezzoBook;
            }
            if (bookPARAM.tematica !== null) {
                book.TematicaLibro = bookPARAM.tematica;
            }
            await book.save();

            let msg = "modifiche al libro salvate con successo!";
            return msg;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error(
                "errore durante il salvataggio delle modifiche al libro selezionato. - Book Repository - saveEditBook"
            );
        }
    }

    async findById(id: string): Promise<IMoongooseBook | Error> {
        try {
            const book = await BookModel.findOne({ _id: id }).exec();
            if (!book) {
                throw new Error("libro non trovato nel database.");
            }
            return book;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante il reperimento del libro. - Book Repository - findById");
        }
    }
}

export { BookRepository };
