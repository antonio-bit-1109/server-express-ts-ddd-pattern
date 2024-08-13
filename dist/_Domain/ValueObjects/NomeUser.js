"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NomeUser {
    constructor(nome) {
        this.nome = this.validate(nome);
    }
    validate(nome) {
        // Controlla che il nome contenga solo lettere
        if (this.onlyLetters(nome) && this.maxLength(nome)) {
            return nome;
        }
        throw new Error("fallimento validazione nome.");
    }
    onlyLetters(nome) {
        if (/^[A-Za-z]+$/.test(nome)) {
            return nome;
        }
        throw new Error("ERRORE VALIDAZIONE - NOME , il nome fornito non contiene solo lettere.");
    }
    maxLength(nome) {
        if (nome.length <= 10) {
            return nome;
        }
        throw new Error("ERRORE VALIDAZIONE - NOME , il nome fornito è più lungo di 10 caratteri.");
    }
}
exports.default = NomeUser;
