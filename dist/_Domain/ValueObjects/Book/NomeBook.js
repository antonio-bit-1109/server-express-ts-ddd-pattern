"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NomeBook {
    nomeBook;
    constructor(nomeBook) {
        if (this.validate(nomeBook)) {
            this.nomeBook = nomeBook;
        }
        else {
            throw new Error("il titolo contiene caratteri non supportati. usare solo lettere, numeri e i seguenti caratteri speciali: '.,!?;:()-]\\' ");
        }
    }
    validate(nomeBook) {
        return /^[A-Za-z0-9.,!?;:()\-]+$/.test(nomeBook);
    }
    getValue() {
        return this.nomeBook;
    }
}
exports.default = NomeBook;
