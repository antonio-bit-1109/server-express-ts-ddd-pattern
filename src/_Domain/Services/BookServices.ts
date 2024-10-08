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

import { inject, injectable } from "inversify";
import {
    DTO_BOOK,
    IBookRepository,
    IcleanBook,
    IDataEditBook,
    IModifiedBook,
    IMoongooseBook,
} from "../../interfaces/interfaces";
import Book from "../Entities/Book";
import { TYPES } from "../../_dependency_inject/types";
import * as cheerio from "cheerio";
import axios from "axios";
import { handleStringInArray } from "../../utils/utilityFunctions";

@injectable()
class BookServices {
    private bookRepository: IBookRepository; // Attributo della classe

    // constructor(bookRepository: IBookRepository) {
    //     // Costruttore
    //     this.bookRepository = bookRepository; // Iniezione della dipendenza
    // }
    constructor(@inject(TYPES.BOOK_REPOSITORY) bookRepository_DEPEND: IBookRepository) {
        this.bookRepository = bookRepository_DEPEND;
    }

    // tutta la logica di business scritta qui dentro
    public async createBook(data: DTO_BOOK) {
        try {
            //1- valido i dati in entrata nel controller per garantire che rispecchinole validazioni inserite nel valueObject

            const book = new Book(
                data.nomeLibro.trim(),
                data.prezzoLibro,
                data.autoreLibro.trim(),
                data.pagine,
                data.isCopertinaRigida,
                data.tematica.trim(),
                "CREATE"
                // data.imgCopertina
            );
            const cleanBook: IcleanBook = book.clean();
            if (cleanBook.nomeBook !== null && cleanBook.autoreBook !== null) {
                const isDuplicate = await this.bookRepository.checkForDuplicate(
                    cleanBook.nomeBook,
                    cleanBook.autoreBook
                );
                if (isDuplicate instanceof Error) {
                    throw isDuplicate;
                }
            }
            const esito = await this.bookRepository.save(cleanBook);
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

    public async handleGetAllBooks(): Promise<Error | IMoongooseBook[]> {
        try {
            const books = await this.bookRepository.getAllBooks();
            if (books instanceof Error) {
                throw books;
            }
            return books;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore nel servizio getAllBooks" + err);
        }
    }

    public async handleEditBook(data: IDataEditBook) {
        try {
            if (data.titolo !== "" || data.autore !== "") {
                const resultDuplicate = await this.bookRepository.checkForDuplicate(data.titolo, data.autore);
                if (resultDuplicate instanceof Error) {
                    throw resultDuplicate;
                }
            }

            const book = new Book(
                data.titolo,
                data.prezzo,
                data.autore,
                data.numPagine,
                data.copertinaRigida,
                data.tema,
                "EDIT"
                // ""
            );

            console.log(book);

            const modifiedBook: IModifiedBook = book.cleanWithId(data.id);

            console.log(modifiedBook);

            const result = await this.bookRepository.saveEditedBook(modifiedBook);
            if (result instanceof Error) {
                throw result;
            }
            return result;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante la modifica del libro HandleEdit book - BookServices");
        }
    }

    public async handleEditBookImg(imgFile: Express.Multer.File, id: string): Promise<string | Error> {
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
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante la modifica del libro HandleEdit book - BookServices");
        }
    }

    public async handleWebScrapingSite(): Promise<(string | number | boolean)[] | Error> {
        try {
            const URL = "https://it.wikipedia.org/wiki/I_Gatti_di_Vicolo_Miracoli";

            const response = await axios.get(URL);
            const cssTag = cheerio.load(response.data);
            const textInTag: string[] = cssTag("p")
                .map((i, el) => cssTag(el).text())
                .get();
            // console.log(textInTag);
            const result: (string | number | boolean)[] = handleStringInArray(textInTag);

            return result;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante il web scraping - BookServices --- handleWebScrapingSite");
        }
    }
}

export { BookServices };
