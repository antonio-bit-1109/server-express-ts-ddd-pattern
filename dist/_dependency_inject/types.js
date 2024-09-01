"use strict";
// STO USANDO INVERSIFY JS PER CREARE DEI CONTAINER CON CUI FARE DEPENDENCY INJECTION E RENDERE LE CLASSI DEI SINGLETON, IN MODO DA NON DOVER IMPLEMENTARE DEGLI OGGETTI CONCRETI NEL CONTROLLER, MA AVERE UN CONTAINER CHE RICONOSCE UNO SPECIFICO TIPO E INSTANZIA DA SOLO LA CLASSE E LA DISTRUFGGE QUANDO NON SERVE PIù --- MIGLIORAMENTO DELLE PERFORMANCE DELL APPLICAZIONE
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = void 0;
// TIPI PER LO USER
exports.TYPES = {
    //tipi per lo user
    USER_CONTROLLER: Symbol.for("UserController"),
    USER_SERVICES: Symbol.for("UserServices"),
    USER_REPOSITORY: Symbol.for("UserRepository"),
    USER_MODEL: Symbol.for("UserModel"),
    // tipi per il book
    BOOK_CONTROLLER: Symbol.for("BookController"),
    BOOK_SERVICES: Symbol.for("BookServices"),
    BOOK_REPOSITORY: Symbol.for("BookRepository"),
    BOOK_MODEL: Symbol.for("BookModel"),
    //tipi per auth
    AUTH_CONTROLLER: Symbol.for("AuthController"),
    AUTH_SERVICES: Symbol.for("AuthService"),
};
// export default { TYPES };
