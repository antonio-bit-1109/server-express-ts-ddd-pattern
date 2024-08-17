"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NomeUser {
    nome;
    constructor(nome, method) {
        this.nome = this.validate(nome, method);
    }
    validate(nome, method) {
        // se sto editando lo user ed il nome mi arriva "" perchè non sto modificando il nome con questa richiesta, ritorna semplicemente una stringa vuota.
        if (method === "EDIT") {
            if (nome === "") {
                return "";
            }
        }
        const lowerName = this.makeLower(nome);
        if (!/^[A-Za-z]+$/.test(lowerName)) {
            throw new Error("ERRORE VALIDAZIONE - NOME: Il nome deve contenere solo lettere.");
        }
        if (lowerName.length > 10) {
            throw new Error("ERRORE VALIDAZIONE - NOME: Il nome non deve superare i 10 caratteri.");
        }
        return lowerName;
    }
    makeLower(nome) {
        return nome.toLowerCase();
    }
    getValue() {
        return this.nome;
    }
}
exports.default = NomeUser;
