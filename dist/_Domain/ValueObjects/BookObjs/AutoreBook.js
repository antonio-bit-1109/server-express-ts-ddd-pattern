"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AutoreBook {
    autore;
    constructor(autore, method) {
        if (this.OnlyLetter(autore, method)) {
            if (method === "EDIT") {
                this.autore = null;
            }
            else {
                this.autore = autore;
            }
        }
        else {
            throw new Error("l'autore fornito non è nel formato corretto: 'nome cognome' ");
        }
    }
    OnlyLetter(autore, method) {
        if (method === "EDIT") {
            if (autore === "") {
                return true;
            }
        }
        // controllo che stringa in input contenga solo "parola" + spazio + "parola"
        return /^[A-Za-z]+\s[A-Za-z]+$/.test(autore);
    }
    getValue() {
        return this.autore;
    }
}
exports.default = AutoreBook;
