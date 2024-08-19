import bcrypt from "bcrypt";

class PasswordUser {
    // tipizzazione della proprietà della classe
    private password: string;

    // tipizzazione del parametro passato al costruttore
    constructor(password: string, method: string) {
        const hashedPassword = this.validate(password, method);

        if (!hashedPassword && hashedPassword !== "") {
            throw new Error("errore durante la validazione della password.");
        } else {
            this.password = hashedPassword;
        }
    }

    private validate(password: string, method: string) {
        if (method === "EDIT") {
            if (password === "") {
                return "";
            }
        }

        // se la password risulta gia hashata la ritorno immediatamente
        if (this.IsHashed(password)) {
            return password;
        }

        if (this.minLength(password)) {
            const lowerChar = this.makeLower(password);
            return this.hashPassword(lowerChar);
        }
    }

    private IsHashed(password: string): boolean {
        // controlla se la password in input ha i caratteri tipici di una psw hashata con bcrypt
        const bcryptHashRegex = /^\$2[aby]\$.{56}$/;
        return bcryptHashRegex.test(password);
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

    private makeLower(password: string) {
        return password.toLowerCase();
    }

    public getValue(): string {
        return this.password;
    }
}

export default PasswordUser;
