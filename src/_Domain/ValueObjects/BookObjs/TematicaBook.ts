class TematicaBook {
    private tematica: string | null;
    constructor(tematica: string, method: string) {
        this.tematica = this.checkIsOnlyString(tematica, method);
    }

    private checkIsOnlyString(value: string, method: string) {
        if (method === "EDIT") {
            if (value === "") {
                return null;
            }
        }

        if (typeof value !== "string") {
            throw new Error("Il valore deve essere una stringa.");
        }
        if (!/^[A-Za-z ]+$/.test(value)) {
            throw new Error(
                "Errore nella validazione della tematica del libro. Il valore deve contenere solo lettere."
            );
        }

        return value;
    }

    public getValue() {
        return this.tematica;
    }
}

export default TematicaBook;
