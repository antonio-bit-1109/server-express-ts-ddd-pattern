class AutoreBook {
    private autore: string;
    constructor(autore: string) {
        if (this.OnlyLetter(autore)) {
            this.autore = autore;
        } else {
            throw new Error("l'autore fornito non è nel formato corretto: 'nome cognome' ");
        }
    }

    private OnlyLetter(autore: string): boolean {
        // controllo che stringa in input contenga solo "parola" + spazio + "parola"
        return /^[A-Za-z]+\s[A-Za-z]+$/.test(autore);
    }

    public getValue() {
        return this.autore;
    }
}

export default AutoreBook;
