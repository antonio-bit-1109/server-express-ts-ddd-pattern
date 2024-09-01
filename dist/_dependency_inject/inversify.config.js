"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./types");
const UserServices_1 = require("../_Domain/Services/UserServices");
const UserController_Class_1 = require("../_Presentation/controllers/UserController_Class");
const UserRepository_1 = require("../_Domain/Repositories/UserRepository");
const UserModel_1 = __importDefault(require("../_Infrastructures/database/models/UserModel"));
const BookController_Class_1 = require("../_Presentation/controllers/BookController_Class");
const BookServices_1 = require("../_Domain/Services/BookServices");
const BookRepository_1 = require("../_Domain/Repositories/BookRepository");
const BookModel_1 = __importDefault(require("../_Infrastructures/database/models/BookModel"));
const AuthController_Class_1 = require("../_Presentation/controllers/AuthController_Class");
const AuthServices_1 = require("../_Domain/Services/AuthServices");
const container = new inversify_1.Container();
exports.container = container;
// ----------------------------------   LEGGI BENE!!!!
//QUANDO HO BISOGNO DI UNA CLASSE DI TIPO : "TYPES.QUALCOSA" IL CONTEINER MI DEVE FORNIRE UN ISTANZA DI QUELLO CHE C'è SCRITTO NEL METODO "TO" O "TOCONSTANTVALUE"
//es: quando ho bisogno di un oggetto di tipo TYPES.USER_CONTROLLER inversify mi fornisce un istanza della classe UserController_class (come singleton) ed il codice dentro inersify si occupa di fare tutti gli instanziamenti, inoltre il ciclo di vita dell oggetto viene ottimizzato , migliori performance generali dell applicazione.
// -------------------------------------
//
// sto legando la classe concreta userController per essere di tipo USER_CONTROLLER , il quale tipo è specificato nell oggetto TYPES che verrò poi passato al costruttore della classe che ne ha bisogno
// ---------------------INSTANZE USER------------------------
// Questo lega l'implementazione concreta di UserController al simbolo TYPES.USER_CONTROLLER. Quando viene richiesto TYPES.USER_CONTROLLER, Inversify restituirà un'istanza di UserController.
container.bind(types_1.TYPES.USER_CONTROLLER).to(UserController_Class_1.UserController_Class).inSingletonScope();
// Questo lega l'implementazione concreta di UserService al simbolo TYPES.USER_SERVICES. Quando viene richiesto TYPES.USER_SERVICES, Inversify restituirà un'istanza di UserService.
container.bind(types_1.TYPES.USER_SERVICES).to(UserServices_1.UserServices).inSingletonScope();
// Questo lega l'implementazione concreta di UserRepository al simbolo TYPES.USER_REPOSITORY. Quando viene richiesto TYPES.USER_REPOSITORY, Inversify restituirà un'istanza di UserRepository.
container.bind(types_1.TYPES.USER_REPOSITORY).to(UserRepository_1.UserRepository).inSingletonScope();
container.bind(types_1.TYPES.USER_MODEL).toConstantValue(UserModel_1.default);
// ---------------------INSTANZE BOOK------------------------
container.bind(types_1.TYPES.BOOK_CONTROLLER).to(BookController_Class_1.BookController_class).inSingletonScope();
container.bind(types_1.TYPES.BOOK_SERVICES).to(BookServices_1.BookServices).inSingletonScope();
container.bind(types_1.TYPES.BOOK_REPOSITORY).to(BookRepository_1.BookRepository).inSingletonScope();
container.bind(types_1.TYPES.BOOK_MODEL).toConstantValue(BookModel_1.default);
// ---------------------INSTANZE AUTH------------------------
container.bind(types_1.TYPES.AUTH_CONTROLLER).to(AuthController_Class_1.AuthController_Class).inSingletonScope();
container.bind(types_1.TYPES.AUTH_SERVICES).to(AuthServices_1.AuthServices).inSingletonScope();
