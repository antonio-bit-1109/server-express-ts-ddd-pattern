import AutoreBook from "../ValueObjects/Book/AutoreBook";
import CopertinaRigida from "../ValueObjects/Book/CopertinaRiginaBook";
import NomeBook from "../ValueObjects/Book/NomeBook";
import PagineBook from "../ValueObjects/Book/PagineBook";
import PrezzoBook from "../ValueObjects/Book/PrezzoBook";
import TematicaBook from "../ValueObjects/Book/TematicaBook";

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
