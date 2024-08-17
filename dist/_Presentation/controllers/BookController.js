"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utilityFunctions_1 = require("../../utils/utilityFunctions");
const BookRepository_1 = __importDefault(require("../../_Domain/Repositories/BookRepository"));
const BookModel_1 = __importDefault(require("../../_Infrastructures/database/models/BookModel"));
const BookServices_1 = __importDefault(require("../../_Domain/Services/BookServices"));
// instanzio gli oggetti bookRepository e bookServices che servirano per richiamare gli oggetti stessi nel controller.
//bookModel --> bookRepository --> bookServices --> bookController
const bookRepository = new BookRepository_1.default(BookModel_1.default);
const bookServices = new BookServices_1.default(bookRepository);
const createBook = async (req, res, next) => {
    try {
        // attendo i valori del body dal client
        const { nomeLibro, prezzoLibro, autoreLibro, pagine, isCopertinaRigida, tematica } = req.body;
        // se il body rispecchia il formato atteso
        const BodyasExpected = (0, utilityFunctions_1.isBodyAsExpected)(utilityFunctions_1.checkBodyStructure, req.body, {
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
        const dataCreateBook = req.body;
        const esito = await bookServices.createBook(dataCreateBook);
        return res.status(200).json({ message: esito });
    }
    catch (err) {
        next(err);
    }
};
exports.default = { createBook };
