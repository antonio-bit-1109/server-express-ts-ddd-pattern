"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NomeUser {
    nome;
    constructor(nome) {
        this.nome = this.validate(nome);
    }
    validate(nome) {
        if (!/^[A-Za-z]+$/.test(nome)) {
            throw new Error("ERRORE VALIDAZIONE - NOME: Il nome deve contenere solo lettere.");
        }
        if (nome.length > 10) {
            throw new Error("ERRORE VALIDAZIONE - NOME: Il nome non deve superare i 10 caratteri.");
        }
        return nome;
    }
    // public getValue(): string {
    //     return this.nome;
    // }
    getValue() {
        return this.nome;
    }
}
exports.default = NomeUser;
