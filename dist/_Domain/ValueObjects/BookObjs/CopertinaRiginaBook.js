"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CopertinaRigida {
    copertinaRigida;
    constructor(copertinaRigida, method) {
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
    getValue() {
        return this.copertinaRigida;
    }
}
exports.default = CopertinaRigida;
