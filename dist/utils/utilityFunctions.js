"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBodyStructure = checkBodyStructure;
exports.isBodyAsExpected = isBodyAsExpected;
function checkBodyStructure(bodyFromRequest, expectedBody) {
    const receivedKeys = Object.keys(bodyFromRequest);
    console.log("OGGETTO RICEVUTO DAL CLIENT", receivedKeys);
    const expectedkeys = Object.keys(expectedBody);
    console.log("OGGETTO ATTESO DAL CLIENT", expectedkeys);
    // i due arr contenenti il body atteso e ricevuto non hanno stessa lunghezza, sicuro non sono uguali.
    if (receivedKeys.length !== expectedkeys.length) {
        return false;
    }
    for (const key of receivedKeys) {
        if (!expectedkeys.includes(key)) {
            return false;
        }
    }
    return true;
}
// funzione che accetta una funzione , che sarà checkBodyStructure , il body in arrivo dal client e la struttura attesa del body , se il body in entrata supera i controlli, si procede con l'esecuzione del codice all'interno del controller stesso.
function isBodyAsExpected(myFunction, bodyFromRequest, expectedBody) {
    return myFunction(bodyFromRequest, expectedBody);
}
