class TematicaBook {
    private tematica: string;
    constructor(tematica: string) {
        this.tematica = this.checkIsOnlyString(tematica);
    }

    private checkIsOnlyString(value: string) {
        if (typeof value !== "string") {
            throw new Error("Il valore deve essere una stringa.");
        }
        if (!/^[A-Za-z]+$/.test(value)) {
            throw new Error("Il valore deve contenere solo lettere.");
        }

        return value;
    }
}

export default TematicaBook;
