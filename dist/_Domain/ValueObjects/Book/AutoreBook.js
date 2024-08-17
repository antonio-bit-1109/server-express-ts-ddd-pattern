"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AutoreBook {
    autore;
    constructor(autore) {
        if (this.OnlyLetter(autore)) {
            this.autore = autore;
        }
        else {
            throw new Error("l'autore fornito non è nel formato corretto: 'nome cognome' ");
        }
    }
    OnlyLetter(autore) {
        // controllo che stringa in input contenga solo "parola" + spazio + "parola"
        return /^[A-Za-z]+\s[A-Za-z]+$/.test(autore);
    }
    getValue() {
        return this.autore;
    }
}
exports.default = AutoreBook;
