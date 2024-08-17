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

import { DTO_create_book, IBookRepository, IcleanBook } from "../../interfaces/interfaces";
import Book from "../Entities/Book";

class BookServices {
    private bookRepository: IBookRepository; // Attributo della classe

    constructor(bookRepository: IBookRepository) {
        // Costruttore
        this.bookRepository = bookRepository; // Iniezione della dipendenza
    }

    // tutta la logica di business scritta qui dentro
    async createBook(data: DTO_create_book) {
        try {
            //1- valido i dati in entrata nel controller per garantire che rispecchinole validazioni inserite nel valueObject

            const book = new Book(
                data.nomeLibro,
                data.prezzoLibro,
                data.autoreLibro,
                data.pagine,
                data.isCopertinaRigida,
                data.tematica
            );
            const cleanBook: IcleanBook = book.clean();
            const isDuplicate = await this.bookRepository.checkForDuplicate(cleanBook.nomeBook, cleanBook.autoreBook);
            if (isDuplicate instanceof Error) {
                throw isDuplicate;
            }
            const esito = await this.bookRepository.createBook(cleanBook);
            if (esito instanceof Error) {
                throw esito;
            } else {
                const msg = "libro creato con successo.";
                return msg;
            }
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore nel servizio Book Services");
        }
        //logica per la creazione di un book
    }
}

export default BookServices;
