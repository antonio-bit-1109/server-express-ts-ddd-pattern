import { Application } from "express-serve-static-core";
// import mongoose from "mongoose";

// interface params {
//     serverExpress: Application;
//     PORTA: string;
// }

export function serverIsListening(serverExpress: Application, PORTA: string) {
    try {
        serverExpress.listen(PORTA, () => {
            console.log(
                `server in esecuzione sulla porta : ${PORTA}, per connetterti al server usa: http://localhost:${PORTA} `
            );
        });
    } catch (err) {
        console.log(err);
    }
}
