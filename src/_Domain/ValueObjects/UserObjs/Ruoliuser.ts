class RuoliUser {
    private ruoli: string[] = [];

    constructor(ruoli: string[]) {
        try {
            const result = this.validate(ruoli);
            if (Array.isArray(result)) {
                this.ruoli = result;
            }
        } catch (err) {
            throw err;
        }
    }

    private validate(ruoli: string[]): string[] | Error {
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

    private isArrayFIlledOfStrings(ruoli: string[]): boolean {
        return ruoli.every((item) => typeof item === "string");
    }

    private areStringsPermittedValues(ruoli: string[]): boolean {
        const permittedRoles = ["admin", "utente", "moderatore"];

        return permittedRoles.some((item) => ruoli.includes(item));
    }

    public getValue() {
        return this.ruoli;
    }
}

export { RuoliUser };
