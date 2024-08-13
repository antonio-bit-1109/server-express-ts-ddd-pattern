"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverIsListening = serverIsListening;
// import mongoose from "mongoose";
// interface params {
//     serverExpress: Application;
//     PORTA: string;
// }
function serverIsListening(serverExpress, PORTA) {
    try {
        serverExpress.listen(PORTA, () => {
            console.log(`server in esecuzione sulla porta : ${PORTA}, per connetterti al server usa: http://localhost:${PORTA} `);
        });
    }
    catch (err) {
        console.log(err);
    }
}
