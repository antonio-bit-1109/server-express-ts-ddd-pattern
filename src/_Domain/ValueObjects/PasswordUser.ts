import bcrypt from "bcrypt";

class PasswordUser {
    // tipizzazione della proprietà della classe
    private password: string;

    // tipizzazione del parametro passato al costruttore
    constructor(password: string) {
        const hashedPassword = this.validate(password);
        if (!hashedPassword) {
            throw new Error("errore durante la validazione della password.");
        }

        this.password = hashedPassword;
    }

    private validate(password: string) {
        if (this.minLength(password)) {
            return this.hashPassword(password);
        }
    }

    private minLength(password: string) {
        if (password.length >= 10) {
            return true;
        }
        throw new Error("password troppo corta. deve essere lunga almeno 10 caratteri");
    }

    private hashPassword(password: string) {
        try {
            return bcrypt.hashSync(password, 10);
        } catch (err) {
            throw new Error("Errore durante l'hashing della password.");
        }
    }

    public getValue(): string {
        return this.password;
    }
}

export default PasswordUser;
