class CopertinaRigida {
    private copertinaRigida;
    constructor(copertinaRigida: boolean) {
        if (typeof copertinaRigida !== "boolean") {
            throw new Error("copertina rigida deve essere un booleano.");
        }
        this.copertinaRigida = copertinaRigida;
    }

    public getValue() {
        return this.copertinaRigida;
    }
}

export default CopertinaRigida;
