import { Response, Request, NextFunction } from "express";
import { checkBodyStructure, isBodyAsExpected } from "../../utils/utilityFunctions";
import { DTO_BOOK } from "../../interfaces/interfaces";
import BookRepository from "../../_Domain/Repositories/BookRepository";
import BookModel from "../../_Infrastructures/database/models/BookModel";
import BookServices from "../../_Domain/Services/BookServices";

// instanzio gli oggetti bookRepository e bookServices che servirano per richiamare gli oggetti stessi nel controller.

//bookModel --> bookRepository --> bookServices --> bookController

const bookRepository = new BookRepository(BookModel);
const bookServices = new BookServices(bookRepository);

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // attendo i valori del body dal client
        const { nomeLibro, prezzoLibro, autoreLibro, pagine, isCopertinaRigida, tematica } = req.body;

        // se il body rispecchia il formato atteso
        const BodyasExpected = isBodyAsExpected(checkBodyStructure, req.body, {
            nomeLibro,
            prezzoLibro,
            autoreLibro,
            pagine,
            isCopertinaRigida,
            tematica,
        });

        if (!BodyasExpected) {
            return res.status(400).json({ message: `body fornito non corretto.` });
        }

        //imposto una variabile per racchiudere il body inviato dal client
        const dataCreateBook: DTO_BOOK = req.body;
        const esito = await bookServices.createBook(dataCreateBook);
        return res.status(200).json({ message: esito });
    } catch (err) {
        next(err);
    }
};

// const EditBook = async (req: Request, res: Response, next: NextFunction) => {
//     const { idBook } = req.params;
//     const { nomeLibro, prezzoLibro, isCopertinaRigida, autoreLibro, pagine, tematica } = req.body;

//     // per fare edit del libro non è obbligatorio inviare tutte le "proprietà che compongono l'oggetto libro, posso anche voler modificare solo il nome, o solo il prezzo ecc ecc"

//     //i campi non da modificare devono arrivare come stringhe vuote: ""

//     if (!idBook) {
//         return res.status(400).json({ message: "body fornito manca di proprietà fondamentali." });
//     }

//     const dataEditBook: DTO_BOOK = req.body;

//     await bookServices.editBookServ(dataEditBook, idBook);
// };

export default { createBook /* EditBook */ };
