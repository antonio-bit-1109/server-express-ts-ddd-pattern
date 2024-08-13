class EmailUser {
    private email: string;
    constructor(email: string, method: string) {
        this.email = this.validate(email, method);
    }

    // Metodo privato per la validazione dell'email
    private validate(email: string, method: string) {
        if (method === "EDIT") {
            if (email === "") {
                return "";
            }
        }

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const lowerChar = this.makeLower(email);
            return lowerChar;
        }
        throw new Error("fallimento validazione email. email deve essere nel formato aaa@aaa.it/.com");
    }

    private makeLower(email: string) {
        return email.toLowerCase();
    }

    public getValue(): string {
        return this.email;
    }
}

export default EmailUser;
