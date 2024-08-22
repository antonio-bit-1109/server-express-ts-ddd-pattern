"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuoliUser = void 0;
class RuoliUser {
    ruoli = [];
    constructor(ruoli) {
        try {
            const result = this.validate(ruoli);
            if (Array.isArray(result)) {
                this.ruoli = result;
            }
        }
        catch (err) {
            throw err;
        }
    }
    validate(ruoli) {
        if (!Array.isArray(ruoli)) {
            throw new Error("ruoli deve essere un array di stringhe.");
        }
        if (!this.isArrayFIlledOfStrings(ruoli)) {
            throw new Error("l'array deve contenere stringhe");
        }
        if (!this.areStringsPermittedValues(ruoli)) {
            throw new Error("i ruoli permessi sono : 'admin', 'utente', 'moderatore'");
        }
        return ruoli;
    }
    isArrayFIlledOfStrings(ruoli) {
        return ruoli.every((item) => typeof item === "string");
    }
    areStringsPermittedValues(ruoli) {
        const permittedRoles = ["admin", "utente", "moderatore"];
        return permittedRoles.some((item) => ruoli.includes(item));
    }
    getValue() {
        return this.ruoli;
    }
}
exports.RuoliUser = RuoliUser;
