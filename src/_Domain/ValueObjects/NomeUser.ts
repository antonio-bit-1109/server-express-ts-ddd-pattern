class NomeUser {
    private nome: string;

    constructor(nome: string) {
        this.nome = this.validate(nome);
    }

    private validate(nome: string): string {
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
    public getValue(): string {
        return this.nome;
    }
}

export default NomeUser;
