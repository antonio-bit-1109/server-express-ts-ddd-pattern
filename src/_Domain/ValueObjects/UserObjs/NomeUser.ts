class NomeUser {
    private nome: string;

    constructor(nome: string, method: string) {
        this.nome = this.validate(nome, method);
    }

    private validate(nome: string, method: string): string {
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

    private makeLower(nome: string) {
        return nome.toLowerCase();
    }

    public getValue(): string {
        return this.nome;
    }
}

export default NomeUser;
