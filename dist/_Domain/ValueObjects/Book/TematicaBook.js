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
        if (!/^[A-Za-z]+$/.test(value)) {
            throw new Error("Il valore deve contenere solo lettere.");
        }
        return value;
    }
}
exports.default = TematicaBook;
