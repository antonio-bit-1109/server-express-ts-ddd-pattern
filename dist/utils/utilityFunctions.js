"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBodyStructure = checkBodyStructure;
exports.isBodyAsExpected = isBodyAsExpected;
exports.handleStringInArray = handleStringInArray;
const nodemailer_1 = __importDefault(require("nodemailer"));
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
function handleStringInArray(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        let randomNum = Math.floor(Math.random() * 15);
        console.log(array[i].split(" "));
        switch (i) {
            //titolo libro
            case 0:
                newArray.push(array[randomNum].split(" ").find((word) => /^[A-Z]/.test(word)));
                break;
            //prezzo libro
            case 1:
                let myArray = array[i];
                const number = findNumberMaskedAsString(myArray, i, randomNum);
                newArray.push(number);
                break;
            //nome cognome autore
            case 2:
                const composedName = array[i].split(" ")[randomNum];
                const composedSurname = array[i].split(" ")[randomNum + randomNum];
                if (composedName && composedSurname) {
                    const punteggiatura = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
                    const cleanedName = composedName.replace(punteggiatura, "");
                    newArray.push(`${cleanedName} ${composedSurname}`);
                    break;
                }
                newArray.push("defaultName defaultSurname");
                break;
            // numero pagine
            case 3:
                let myArray2 = array[i];
                const number1 = findNumberMaskedAsString(myArray2, i, randomNum);
                newArray.push(number1);
                break;
            //tematic libro
            case 4:
                newArray.push(array[randomNum].split(" ").find((word) => /^[A-Z]/.test(word)));
                break;
            //copertina rigida (boolean)
            case 5:
                randomNum % 2 === 0 ? newArray.push(true) : newArray.push(false);
                break;
        }
    }
    console.log("NEWARRAY-------- ", newArray);
    return newArray;
}
//titolo
//prezzo
//autore (composto)
//num pagine
//tematica
//copertina rigida -- boolean
function findNumberMaskedAsString(array, i, randomNum) {
    const numberWord = array[i].split(" ").find((word) => !isNaN(parseInt(word)));
    if (!numberWord) {
        return randomNum;
    }
    return numberWord;
}
function creaTrasporter() {
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail", // Può essere un altro servizio come 'yahoo', 'outlook', ecc.
        auth: {
            user: "tuoindirizzo@gmail.com", // Il tuo indirizzo email
            pass: "tuapassword", // La tua password
        },
    });
    return transporter;
}
