"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImmagineCopertinaBook {
    imgCopertina;
    constructor(imgCopertina) {
        this.imgCopertina = this.validate(imgCopertina);
    }
    validate(imgCopertina) {
        try {
            this.isString(imgCopertina);
            this.isValidFormat(imgCopertina);
            return imgCopertina;
        }
        catch (err) {
            throw err;
        }
    }
    isString(imgCopertina) {
        if (typeof imgCopertina !== "string") {
            throw new Error("titolo immagine copertina non è una stringa.");
        }
        return;
    }
    isValidFormat(imgCopertina) {
        const regexExtension = /\.(gif|jpg|jpeg|png|bmp|webp)$/i;
        if (!regexExtension.test(imgCopertina)) {
            throw new Error(" formato immagine non valido. valori accettati (gif|jpg|jpeg|png|bmp|webp)");
        }
        return;
    }
    getValue() {
        return this.imgCopertina;
    }
}
exports.default = ImmagineCopertinaBook;
