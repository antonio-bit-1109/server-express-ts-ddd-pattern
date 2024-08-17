import { Response, Request, NextFunction } from "express";
import { checkBodyStructure, isBodyAsExpected } from "../../utils/utilityFunctions";
import { DTO_create_book } from "../../interfaces/interfaces";
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
        const dataCreateBook: DTO_create_book = req.body;
        const esito = await bookServices.createBook(dataCreateBook);
        return res.status(200).json({ message: esito });
    } catch (err) {
        next(err);
    }
};

export default { createBook };
