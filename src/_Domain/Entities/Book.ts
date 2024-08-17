import AutoreBook from "../ValueObjects/BookObjs/AutoreBook";
import CopertinaRigida from "../ValueObjects/BookObjs/CopertinaRiginaBook";
import NomeBook from "../ValueObjects/BookObjs/NomeBook";
import PagineBook from "../ValueObjects/BookObjs/PagineBook";
import PrezzoBook from "../ValueObjects/BookObjs/PrezzoBook";
import TematicaBook from "../ValueObjects/BookObjs/TematicaBook";

class Book {
    // private autore : AutoreBook
    private nomeBook: NomeBook;
    private prezzoBook: PrezzoBook;
    private autoreBook: AutoreBook;
    private pagineBook: PagineBook;
    private copertinaRigida: CopertinaRigida;
    private tematicaBook: TematicaBook;
    constructor(
        nome: string,
        prezzo: number,
        autore: string,
        pagine: number,
        copertinaRigida: boolean,
        tematica: string
    ) {
        this.nomeBook = new NomeBook(nome);
        this.prezzoBook = new PrezzoBook(prezzo);
        this.autoreBook = new AutoreBook(autore);
        this.pagineBook = new PagineBook(pagine);
        this.copertinaRigida = new CopertinaRigida(copertinaRigida);
        this.tematicaBook = new TematicaBook(tematica);
    }

    clean() {
        return {
            nomeBook: this.nomeBook.getValue(),
            prezzoBook: this.prezzoBook.getValue(),
            autoreBook: this.autoreBook.getValue(),
            pagineBook: this.pagineBook.getValue(),
            isCopertinaRigida: this.copertinaRigida.getValue(),
            tematica: this.tematicaBook.getValue(),
        };
    }
}

export default Book;
