import dotenv from "dotenv";

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

// export function takeSecretKey(): string | Error | unknown {
//     try {
//         dotenv.config();
//         const secretKey = process.env.ACCESS_TOKEN_SECRET;
//         if (!secretKey) {
//             throw new Error("errore durante il reperimento della chiave segreta.");
//         }
//         return secretKey;
//     } catch (err) {
//         return err;
//     }
// }
