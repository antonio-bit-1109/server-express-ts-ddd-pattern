"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CopertinaRigida {
    copertinaRigida;
    constructor(copertinaRigida) {
        if (typeof copertinaRigida !== "boolean") {
            throw new Error("copertina rigida deve essere un booleano.");
        }
        this.copertinaRigida = copertinaRigida;
    }
}
exports.default = CopertinaRigida;
