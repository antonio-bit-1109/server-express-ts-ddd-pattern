// import { IUser } from "../_Infrastructures/database/models/UserModel";
import { ObjectId } from "mongodb";

// Interfaccia per rappresentare un utente nel database
export interface IUser {
    _id: ObjectId;
    nome: string;
    cognome: string;
    email: string;
    password: string;
}

// Definisci l'interfaccia IMongooseUser peril modello che si interfaccia con mongoose
// sotto al cofano importa anche _id perche la proprietà _id è della classe Document
export interface IMongooseUser extends Document {
    Nome: string;
    Cognome: string;
    Email: string;
    Password: string;
}

// tipo dati ricevuti al controller User per la creazione
export interface DataCreateUser {
    nome: string;
    cognome: string;
    email: string;
    password: string;
}

// Tipo di dati derivati da un'entità User per la persistenza
export interface ICleanUser {
    nome: string;
    cognome: string;
    email: string;
    password: string;
}

// // lo UserAppService riceve una user repository tipizzare in questo modo, ovvero contenente uesti metodi :
export interface IUserRepository {
    checkForDuplicate(nome: string, email: string): Promise<boolean | Error>;
    Save(user: ICleanUser): Promise<IMongooseUser | null | Error>;
}
