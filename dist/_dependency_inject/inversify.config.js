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
const container = new inversify_1.Container();
exports.container = container;
// sto legando la classe concreta userController per essere di tipo USER_CONTROLLER , il quale tipo è specificato nell oggetto TYPES che verrò poi passato al costruttore della classe che ne ha bisogno
// Questo lega l'implementazione concreta di UserController al simbolo TYPES.USER_CONTROLLER. Quando viene richiesto TYPES.USER_CONTROLLER, Inversify restituirà un'istanza di UserController.
container.bind(types_1.TYPES.USER_CONTROLLER).to(UserController_Class_1.UserController_Class).inSingletonScope();
// Questo lega l'implementazione concreta di UserService al simbolo TYPES.USER_SERVICES. Quando viene richiesto TYPES.USER_SERVICES, Inversify restituirà un'istanza di UserService.
container.bind(types_1.TYPES.USER_SERVICES).to(UserServices_1.UserServices).inSingletonScope();
// Questo lega l'implementazione concreta di UserRepository al simbolo TYPES.USER_REPOSITORY. Quando viene richiesto TYPES.USER_REPOSITORY, Inversify restituirà un'istanza di UserRepository.
container.bind(types_1.TYPES.USER_REPOSITORY).to(UserRepository_1.UserRepository).inSingletonScope();
container.bind(types_1.TYPES.USER_MODEL).toConstantValue(UserModel_1.default);
