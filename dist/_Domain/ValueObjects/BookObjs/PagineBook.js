"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PagineBook {
    pagine;
    constructor(pagine, method) {
        this.pagine = this.checkIsNumber(pagine, method);
    }
    checkIsNumber(pagine, method) {
        if (method === "EDIT") {
            if (pagine === 0) {
                return (this.pagine = null);
            }
        }
        if (Number.isFinite(pagine)) {
            return pagine;
        }
        else {
            throw new Error("il valore fornito per pagine non è un numero.");
        }
    }
    getValue() {
        return this.pagine;
    }
}
exports.default = PagineBook;
