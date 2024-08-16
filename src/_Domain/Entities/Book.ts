import AutoreBook from "../ValueObjects/Book/AutoreBook";
import CopertinaRigida from "../ValueObjects/Book/CopertinaRiginaBook";
import NomeBook from "../ValueObjects/Book/NomeBook";
import PagineBook from "../ValueObjects/Book/PagineBook";
import PrezzoBook from "../ValueObjects/Book/PrezzoBook";
import TematicaBook from "../ValueObjects/Book/TematicaBook";

class book {
    // private autore : AutoreBook
    private nome: NomeBook;
    private prezzo: PrezzoBook;
    private autore: AutoreBook;
    private pagine: PagineBook;
    private copertinaRigida: CopertinaRigida;
    private tematica: TematicaBook;
    constructor(
        nome: string,
        prezzo: number,
        autore: string,
        pagine: number,
        copertinaRigida: boolean,
        tematica: string
    ) {
        this.nome = new NomeBook(nome);
        this.prezzo = new PrezzoBook(prezzo);
        this.autore = new AutoreBook(autore);
        this.pagine = new PagineBook(pagine);
        this.copertinaRigida = new CopertinaRigida(copertinaRigida);
        this.tematica = new TematicaBook(tematica);
    }
}

export default book;
