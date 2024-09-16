import dotenv from "dotenv";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
// import bcrypt from "bcryptjs";
import crypto from "crypto";

// import { buffer } from "stream/consumers";

dotenv.config();
export function checkBodyStructure(bodyFromRequest: object, expectedBody: object): boolean {
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
export function isBodyAsExpected(myFunction: Function, bodyFromRequest: object, expectedBody: object): boolean {
    return myFunction(bodyFromRequest, expectedBody);
}

export function handleStringInArray(array: string[]) {
    const newArray: any[] = [];
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

function findNumberMaskedAsString(array: string, i: number, randomNum: number) {
    const numberWord = array[i].split(" ").find((word) => !isNaN(parseInt(word)));
    if (!numberWord) {
        return randomNum;
    }
    return numberWord;
}

export function criptID(id: string): { iv: string; encryptedData: string } {
    try {
        const key = process.env.CRIPTKEY_CRYPTO || "3NyNKdnGjngVAb6n0+EtoOzu7t2DCMB2mS7X0veBF2EfOA6uz0nZwlI3eGoKk00w";

        console.log(key);
        // if (key.length !== 32) {
        //     throw new Error("La chiave di crittografia deve essere lunga 32 byte.");
        // }

        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);

        let encrypted = cipher.update(id, "utf8", "hex");
        encrypted += cipher.final("hex");

        // Restituisci l'IV e i dati crittografati
        return { iv: iv.toString("hex"), encryptedData: encrypted };
    } catch (err) {
        throw err;
    }
}

export function decriptID(crittedId: string, iv: string): string | Error {
    try {
        // Recupera la chiave dal file .env
        const key = process.env.CRIPTKEY_CRYPTO;

        if (!key) {
            throw new Error("Chiave di crittografia non trovata");
        }

        const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));

        let decrypted = decipher.update(crittedId, "hex", "utf8");
        decrypted += decipher.final("utf8");

        return decrypted; // Restituisce l'ID utente decrittato
    } catch (err) {
        throw err;
    }
}
