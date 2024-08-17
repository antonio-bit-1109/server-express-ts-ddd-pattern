class CognomeUser {
    private cognome: string;
    constructor(cognome: string, method: string) {
        this.cognome = this.validate(cognome, method);
    }

    public validate(cognome: string, method: string) {
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

    private onlyLetters(cognome: string) {
        if (!/^[A-Za-z]+$/.test(cognome)) {
            throw new Error("ERRORE VALIDAZIONE - COGNOME , il cognome fornito non contiene solo lettere.");
        }
    }

    private maxLength(cognome: string) {
        if (cognome.length > 20) {
            throw new Error("ERRORE VALIDAZIONE - COGNOME , il cognome fornito è più lungo di 20 caratteri.");
        }
    }

    private makeLower(cognome: string) {
        return cognome.toLowerCase();
    }

    public getValue(): string {
        return this.cognome;
    }
}

export default CognomeUser;
