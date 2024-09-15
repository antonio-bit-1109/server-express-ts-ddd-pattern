import dotenv from "dotenv";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import bcrypt from "bcryptjs";

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

export function criptID(id: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPsw = bcrypt.hashSync(id, salt);
    return hashedPsw;
}
