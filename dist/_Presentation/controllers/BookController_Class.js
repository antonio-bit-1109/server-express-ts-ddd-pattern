"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController_class = void 0;
const inversify_1 = require("inversify");
const BookServices_1 = require("../../_Domain/Services/BookServices");
const types_1 = require("../../_dependency_inject/types");
const utilityFunctions_1 = require("../../utils/utilityFunctions");
let BookController_class = class BookController_class {
    bookServices;
    constructor(BookServices_DEPEND) {
        this.bookServices = BookServices_DEPEND;
    }
    async getAllBooks(req, res, next) {
        try {
            const Books = await this.bookServices.handleGetAllBooks();
            if (Books instanceof Error) {
                throw Books;
            }
            return res.status(200).json({ Books });
        }
        catch (err) {
            next(err);
        }
    }
    async createBook(req, res, next) {
        try {
            // attendo i valori del body dal client
            const { nomeLibro, prezzoLibro, autoreLibro, pagine, isCopertinaRigida, tematica /* , imgCopertina */ } = req.body;
            // se il body rispecchia il formato atteso
            const BodyasExpected = (0, utilityFunctions_1.isBodyAsExpected)(utilityFunctions_1.checkBodyStructure, req.body, {
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
            const dataCreateBook = req.body;
            const esito = await this.bookServices.createBook(dataCreateBook);
            // await bookServices.SaveImgOn_Server()
            return res.status(200).json({ message: esito });
        }
        catch (err) {
            next(err);
        }
    }
    async editBook(req, res, next) {
        try {
            console.log(req.body);
            // return;
            const { titolo, prezzo, autore, tema, copertinaRigida, numPagine, id } = req.body;
            // se il body rispecchia il formato atteso
            const BodyasExpected = (0, utilityFunctions_1.isBodyAsExpected)(utilityFunctions_1.checkBodyStructure, req.body, {
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
            const dataEditBook = req.body;
            const result = await this.bookServices.handleEditBook(dataEditBook);
            return res.status(200).json({ message: result });
        }
        catch (err) {
            next(err);
        }
    }
};
exports.BookController_class = BookController_class;
exports.BookController_class = BookController_class = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.BOOK_SERVICES)),
    __metadata("design:paramtypes", [BookServices_1.BookServices])
], BookController_class);
