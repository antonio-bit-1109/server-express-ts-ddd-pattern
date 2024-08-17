"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatusUser {
    status;
    constructor(status) {
        if (typeof status !== "boolean") {
            throw new Error("status deve essere un valore true o false.");
        }
        this.status = status;
    }
    getValue() {
        return this.status;
    }
}
exports.default = StatusUser;
