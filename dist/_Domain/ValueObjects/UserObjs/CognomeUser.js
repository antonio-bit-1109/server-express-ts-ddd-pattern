"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CognomeUser {
    cognome;
    constructor(cognome, method) {
        this.cognome = this.validate(cognome, method);
    }
    validate(cognome, method) {
        if (method === "EDIT") {
            if (cognome === "") {
                return "";
            }
        }
        this.onlyLetters(cognome);
        this.maxLength(cognome);
        const lowerChar = this.makeLower(cognome);
        return lowerChar;
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
    makeLower(cognome) {
        return cognome.toLowerCase();
    }
    getValue() {
        return this.cognome;
    }
}
exports.default = CognomeUser;
