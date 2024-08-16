class PrezzoBook {
    private prezzo: number;
    constructor(prezzo: number) {
        this.prezzo = this.IsNumber(prezzo);
    }

    private IsNumber(prezzo: number) {
        if (Number.isFinite(prezzo)) {
            return prezzo;
        } else {
            throw new Error("il valore fornito per prezzo non è un numero.");
        }
    }
}

export default PrezzoBook;
