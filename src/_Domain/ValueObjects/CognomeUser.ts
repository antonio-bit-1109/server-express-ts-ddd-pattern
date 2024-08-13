class CognomeUser {
    private cognome: string;
    constructor(cognome: string) {
        this.cognome = this.validate(cognome);
    }

    public validate(cognome: string) {
        this.onlyLetters(cognome);
        this.maxLength(cognome);
        return cognome;
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

    public getValue(): string {
        return this.cognome;
    }
}

export default CognomeUser;
