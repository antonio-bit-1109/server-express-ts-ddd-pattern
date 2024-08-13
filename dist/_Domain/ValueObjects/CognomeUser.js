"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CognomeUser {
    constructor(cognome) {
        this.cognome = this.validate(cognome);
    }
    validate(cognome) {
        this.onlyLetters(cognome);
        this.maxLength(cognome);
        return cognome;
    }
    onlyLetters(cognome) {
        if (!/^[A-Za-z]+$/.test(cognome)) {
            throw new Error("ERRORE VALIDAZIONE - COGNOME , il cognome fornito non contiene solo lettere.");
        }
    }
    maxLength(cognome) {
        if (cognome.length > 20) {
            throw new Error("ERRORE VALIDAZIONE - COGNOME , il cognome fornito è più lungo di 20 caratteri.");
        }
    }
}
exports.default = CognomeUser;
