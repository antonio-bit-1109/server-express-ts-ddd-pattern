import { Container } from "inversify";
import { TYPES } from "./types";
import { UserServices } from "../_Domain/Services/UserServices";
import { UserController_Class } from "../_Presentation/controllers/UserController_Class";
import { UserRepository } from "../_Domain/Repositories/UserRepository";
import UserModel from "../_Infrastructures/database/models/UserModel";
import { Model } from "mongoose";
import { IMongooseUser } from "../interfaces/interfaces";
const container = new Container();

// ----------------------------------   LEGGI BENE!!!!
//QUANDO HO BISOGNO DI UNA CLASSE DI TIPO : "TYPES.QUALCOSA" IL CONTEINER MI DEVE FORNIRE UN ISTANZA DI QUELLO CHE C'è SCRITTO NEL METODO "TO" O "TOCONSTANTVALUE"
//es: quando ho bisogno di un oggetto di tipo TYPES.USER_CONTROLLER inversify mi fornisce un istanza della classe UserController_class (come singleton) ed il codice dentro inersify si occupa di fare tutti gli instanziamenti, inoltre il ciclo di vita dell oggetto viene ottimizzato , migliori performance generali dell applicazione.
// -------------------------------------
//
// sto legando la classe concreta userController per essere di tipo USER_CONTROLLER , il quale tipo è specificato nell oggetto TYPES che verrò poi passato al costruttore della classe che ne ha bisogno

// Questo lega l'implementazione concreta di UserController al simbolo TYPES.USER_CONTROLLER. Quando viene richiesto TYPES.USER_CONTROLLER, Inversify restituirà un'istanza di UserController.
container.bind<UserController_Class>(TYPES.USER_CONTROLLER).to(UserController_Class).inSingletonScope();

// Questo lega l'implementazione concreta di UserService al simbolo TYPES.USER_SERVICES. Quando viene richiesto TYPES.USER_SERVICES, Inversify restituirà un'istanza di UserService.
container.bind<UserServices>(TYPES.USER_SERVICES).to(UserServices).inSingletonScope();

// Questo lega l'implementazione concreta di UserRepository al simbolo TYPES.USER_REPOSITORY. Quando viene richiesto TYPES.USER_REPOSITORY, Inversify restituirà un'istanza di UserRepository.
container.bind<UserRepository>(TYPES.USER_REPOSITORY).to(UserRepository).inSingletonScope();

container.bind<Model<IMongooseUser>>(TYPES.USER_MODEL).toConstantValue(UserModel);
export { container };
