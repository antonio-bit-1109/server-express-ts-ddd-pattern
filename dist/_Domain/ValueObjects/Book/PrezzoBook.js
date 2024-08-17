"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrezzoBook {
    prezzo;
    constructor(prezzo) {
        this.prezzo = this.IsNumber(prezzo);
    }
    IsNumber(prezzo) {
        if (Number.isFinite(prezzo)) {
            return prezzo;
        }
        else {
            throw new Error("il valore fornito per prezzo non è un numero.");
        }
    }
    getValue() {
        return this.prezzo;
    }
}
exports.default = PrezzoBook;
