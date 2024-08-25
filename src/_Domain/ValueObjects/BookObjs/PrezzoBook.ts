class PrezzoBook {
    private prezzo: number | null;
    constructor(prezzo: number, method: string) {
        this.prezzo = this.IsNumber(prezzo, method);
    }

    private IsNumber(prezzo: number, method: string) {
        if (method === "EDIT") {
            if (prezzo === 0) {
                return null;
            }
        }

        if (Number.isFinite(prezzo)) {
            return prezzo;
        } else {
            throw new Error("il valore fornito per prezzo non è un numero.");
        }
    }

    public getValue() {
        return this.prezzo;
    }
}

export default PrezzoBook;
