"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TematicaBook {
    tematica;
    constructor(tematica) {
        this.tematica = this.checkIsOnlyString(tematica);
    }
    checkIsOnlyString(value) {
        if (typeof value !== "string") {
            throw new Error("Il valore deve essere una stringa.");
        }
        if (!/^[A-Za-z ]+$/.test(value)) {
            throw new Error("Errore nella validazione della tematica del libro. Il valore deve contenere solo lettere.");
        }
        return value;
    }
    getValue() {
        return this.tematica;
    }
}
exports.default = TematicaBook;
