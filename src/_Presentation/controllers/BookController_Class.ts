import { injectable, inject } from "inversify";
import { BookServices } from "../../_Domain/Services/BookServices";
import { TYPES } from "../../_dependency_inject/types";
import { Request, Response, NextFunction, response } from "express";
import { checkBodyStructure, isBodyAsExpected } from "../../utils/utilityFunctions";
import { DTO_BOOK, IDataEditBook } from "../../interfaces/interfaces";

@injectable()
class BookController_class {
    private bookServices: BookServices;
    constructor(@inject(TYPES.BOOK_SERVICES) BookServices_DEPEND: BookServices) {
        this.bookServices = BookServices_DEPEND;
    }

    public async getAllBooks(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const Books = await this.bookServices.handleGetAllBooks();
            if (Books instanceof Error) {
                throw Books;
            }
            return res.status(200).json({ Books });
        } catch (err) {
            next(err);
        }
    }

    public async createBook(req: Request, res: Response, next: NextFunction) {
        try {
            // attendo i valori del body dal client
            const { nomeLibro, prezzoLibro, autoreLibro, pagine, isCopertinaRigida, tematica, imgCopertina } = req.body;

            // se il body rispecchia il formato atteso
            const BodyasExpected = isBodyAsExpected(checkBodyStructure, req.body, {
                nomeLibro,
                prezzoLibro,
                autoreLibro,
                pagine,
                isCopertinaRigida,
                tematica,
                imgCopertina,
            });

            if (!BodyasExpected) {
                return res.status(400).json({ message: `body fornito non corretto.` });
            }

            //imposto una variabile per racchiudere il body inviato dal client
            const dataCreateBook: DTO_BOOK = req.body;
            const esito = await this.bookServices.createBook(dataCreateBook);
            // await bookServices.SaveImgOn_Server()
            return res.status(200).json({ message: esito });
        } catch (err) {
            next(err);
        }
    }

    public async editBook(req: Request, res: Response, next: NextFunction) {
        try {
            const { titolo, prezzo, autore, tema, copertinaRigida, numPagine, id } = req.body;
            // se il body rispecchia il formato atteso
            const BodyasExpected = isBodyAsExpected(checkBodyStructure, req.body, {
                titolo,
                prezzo,
                autore,
                tema,
                copertinaRigida,
                numPagine,
                id,
            });

            if (!BodyasExpected) {
                return res.status(400).json({ message: `body fornito non corretto.` });
            }

            const dataEditBook: IDataEditBook = req.body;

            const result = await this.bookServices.handleEditBook(dataEditBook);
            return res.status(200).json({ message: result });
        } catch (err) {
            next(err);
        }
    }
}

export { BookController_class };
