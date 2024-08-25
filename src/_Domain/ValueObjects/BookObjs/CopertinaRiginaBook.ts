class CopertinaRigida {
    private copertinaRigida: boolean | null;
    constructor(copertinaRigida: boolean | null, method: string) {
        // if (typeof copertinaRigida !== "boolean") {
        //     // throw new Error("copertina rigida deve essere un booleano.");
        // }

        // if (this.copertinaRigida === copertinaRigida)
        this.copertinaRigida = copertinaRigida;
    }

    // private validate(copertinaRigida:boolean | null){
    //     if (typeof copertinaRigida === "boolean"){
    //         return copertinaRigida
    //     }
    // }

    public getValue() {
        return this.copertinaRigida;
    }
}

export default CopertinaRigida;
