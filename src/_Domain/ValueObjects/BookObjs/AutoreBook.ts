class AutoreBook {
    private autore: string | null;
    constructor(autore: string, method: string) {
        if (this.OnlyLetter(autore, method)) {
            if (method === "EDIT") {
                this.autore = null;
            } else {
                this.autore = autore;
            }
        } else {
            throw new Error("l'autore fornito non è nel formato corretto: 'nome cognome' ");
        }
    }

    private OnlyLetter(autore: string, method: string): boolean | null {
        if (method === "EDIT") {
            if (autore === "") {
                return true;
            }
        }

        // controllo che stringa in input contenga solo "parola" + spazio + "parola"
        return /^[A-Za-z]+\s[A-Za-z]+$/.test(autore);
    }

    public getValue() {
        return this.autore;
    }
}

export default AutoreBook;
