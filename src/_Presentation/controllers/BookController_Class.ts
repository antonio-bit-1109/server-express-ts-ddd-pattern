import { injectable, inject } from "inversify";
import { BookServices } from "../../_Domain/Services/BookServices";
import { TYPES } from "../../_dependency_inject/types";
import { Request, Response, NextFunction, response } from "express";
import { checkBodyStructure, isBodyAsExpected } from "../../utils/utilityFunctions";
import { DTO_BOOK, IDataEditBook } from "../../interfaces/interfaces";
import fs from "fs";
import path from "path";

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

    public async createBook(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            // attendo i valori del body dal client
            const { nomeLibro, prezzoLibro, autoreLibro, pagine, isCopertinaRigida, tematica /* , imgCopertina */ } =
                req.body;

            // se il body rispecchia il formato atteso
            const BodyasExpected = isBodyAsExpected(checkBodyStructure, req.body, {
                nomeLibro,
                prezzoLibro,
                autoreLibro,
                pagine,
                isCopertinaRigida,
                tematica,
                /*    imgCopertina, */
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

    public async editBook(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            // console.log(req.body);

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
            console.log(dataEditBook);
            const result = await this.bookServices.handleEditBook(dataEditBook);
            return res.status(200).json({ message: result });
        } catch (err) {
            next(err);
        }
    }

    public async editImgBook(req: Request, res: Response, next: NextFunction) /* : Promise<Response | undefined> */ {
        try {
            // console.log(req);
            console.log(req.file);
            console.log(req.body);
            const bookImage = req.file;
            const { bookId } = req.body;

            if (!bookImage || !bookId) {
                return res.status(400).json({ message: "dati necessari non forniti." });
            }

            const result = await this.bookServices.handleEditBookImg(bookImage, bookId);
            if (result instanceof Error) {
                throw result;
            }
            const tempPath = bookImage.path;
            const newPath = path.join(__dirname, "../../public/imgs/" + bookImage.filename);
            fs.rename(tempPath, newPath, (err) => {
                if (err) {
                    throw err;
                }
                console.log("File spostato con successo");
                // elimino il file salvato in temp
                fs.unlink(tempPath, (Err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("immagine cancellata con successo dalla cartella temporanea.");
                });
            });

            return res.status(200).json({ message: result });
        } catch (err) {
            next(err);
        }
    }

    public async doingWebScraping(req: Request, res: Response, next: NextFunction) {
        try {
            const result: (string | number | boolean)[] | Error = await this.bookServices.handleWebScrapingSite();

            if (!Array.isArray(result)) {
                throw result;
            }
            return res.status(200).json({ array: result });
        } catch (err) {
            next(err);
        }
    }

    public async DummyFetch(req: Request, res: Response, next: NextFunction) {
        try {
            const queryParams = req.query;
            // console.log(queryParams);
            return res.status(200).json({ message: "fetch arrivata con successo." });
        } catch (err) {
            next(err);
        }
    }
}

export { BookController_class };
