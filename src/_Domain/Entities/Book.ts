import AutoreBook from "../ValueObjects/BookObjs/AutoreBook";
import CopertinaRigida from "../ValueObjects/BookObjs/CopertinaRiginaBook";
import ImmagineCopertinaBook from "../ValueObjects/BookObjs/ImmagineCopertinaBook";
import NomeBook from "../ValueObjects/BookObjs/NomeBook";
import PagineBook from "../ValueObjects/BookObjs/PagineBook";
import PrezzoBook from "../ValueObjects/BookObjs/PrezzoBook";
import TematicaBook from "../ValueObjects/BookObjs/TematicaBook";
import { ObjectId } from "mongodb";

class Book {
    // private autore : AutoreBook
    private nomeBook: NomeBook;
    private prezzoBook: PrezzoBook;
    private autoreBook: AutoreBook;
    private pagineBook: PagineBook;
    private copertinaRigida: CopertinaRigida;
    private tematicaBook: TematicaBook;
    /*    private imgCopertina: string; */
    constructor(
        nome: string,
        prezzo: number,
        autore: string,
        pagine: number,
        copertinaRigida: boolean,
        tematica: string,
        method: string
        // imgCopertina: string
    ) {
        this.nomeBook = new NomeBook(nome, method);
        this.prezzoBook = new PrezzoBook(prezzo, method);
        this.autoreBook = new AutoreBook(autore, method);
        this.pagineBook = new PagineBook(pagine, method);
        this.copertinaRigida = new CopertinaRigida(copertinaRigida, method);
        this.tematicaBook = new TematicaBook(tematica, method);
        /*         this.imgCopertina = imgCopertina; /* new ImmagineCopertinaBook(imgCopertina); */
    }

    clean() {
        return {
            nomeBook: this.nomeBook.getValue(),
            prezzoBook: this.prezzoBook.getValue(),
            autoreBook: this.autoreBook.getValue(),
            pagineBook: this.pagineBook.getValue(),
            isCopertinaRigida: this.copertinaRigida.getValue(),
            tematica: this.tematicaBook.getValue(),
            // imgCopertina: this.imgCopertina.toString(),
        };
    }

    cleanWithId(id: string) {
        return {
            _id: new ObjectId(id),
            nomeBook: this.nomeBook.getValue(),
            prezzoBook: this.prezzoBook.getValue(),
            autoreBook: this.autoreBook.getValue(),
            pagineBook: this.pagineBook.getValue(),
            isCopertinaRigida: this.copertinaRigida.getValue(),
            tematica: this.tematicaBook.getValue(),
            // imgCopertina: this.imgCopertina.toString(),
        };
    }
}

export default Book;
