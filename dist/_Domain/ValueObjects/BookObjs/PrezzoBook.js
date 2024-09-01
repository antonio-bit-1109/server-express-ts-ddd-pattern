"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrezzoBook {
    prezzo;
    constructor(prezzo, method) {
        this.prezzo = this.IsNumber(prezzo, method);
    }
    IsNumber(prezzo, method) {
        if (method === "EDIT") {
            if (prezzo === 0) {
                return null;
            }
        }
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
