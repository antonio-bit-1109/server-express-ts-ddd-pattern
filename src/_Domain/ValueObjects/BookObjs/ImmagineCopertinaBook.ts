class ImmagineCopertinaBook {
    private imgCopertina: string;
    constructor(imgCopertina: string) {
        this.imgCopertina = this.validate(imgCopertina);
    }

    private validate(imgCopertina: string) {
        try {
            this.isString(imgCopertina);
            this.isValidFormat(imgCopertina);
            return imgCopertina;
        } catch (err) {
            throw err;
        }
    }

    private isString(imgCopertina: string): void | Error {
        if (typeof imgCopertina !== "string") {
            throw new Error("titolo immagine copertina non è una stringa.");
        }
        return;
    }

    private isValidFormat(imgCopertina: string): void | Error {
        const regexExtension = /\.(gif|jpg|jpeg|png|bmp|webp)$/i;

        if (!regexExtension.test(imgCopertina)) {
            throw new Error(" formato immagine non valido. valori accettati (gif|jpg|jpeg|png|bmp|webp)");
        }
        return;
    }

    public getValue() {
        return this.imgCopertina;
    }
}

export default ImmagineCopertinaBook;
