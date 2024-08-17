"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PagineBook {
    pagine;
    constructor(pagine) {
        this.pagine = this.checkIsNumber(pagine);
    }
    checkIsNumber(pagine) {
        if (Number.isFinite(pagine)) {
            return pagine;
        }
        else {
            throw new Error("il valore fornito per pagine non è un numero.");
        }
    }
}
exports.default = PagineBook;
