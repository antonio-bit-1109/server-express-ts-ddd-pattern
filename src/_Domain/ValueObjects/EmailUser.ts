class EmailUser {
    private email: string;
    constructor(email: string) {
        this.email = this.validate(email);
    }

    // Metodo privato per la validazione dell'email
    private validate(email: string) {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return email;
        }
        throw new Error("fallimento validazione email. email deve essere nel formato aaa@aaa.it/.com");
    }

    public getValue(): string {
        return this.email;
    }
}

export default EmailUser;
