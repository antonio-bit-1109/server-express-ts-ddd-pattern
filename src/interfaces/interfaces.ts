// import { IUser } from "../_Infrastructures/database/models/UserModel";
import { ObjectId } from "mongodb";

// Interfaccia per rappresentare un utente nel database
export interface IUser {
    _id: ObjectId;
    nome: string;
    cognome: string;
    email: string;
    password: string;
    isActive: boolean;
}

// Definisci l'interfaccia IMongooseUser peril modello che si interfaccia con mongoose
// sotto al cofano importa anche _id perche la proprietà _id è della classe Document
export interface IMongooseUser extends Document {
    Nome: string;
    Cognome: string;
    Email: string;
    Password: string;
    IsActive: boolean;
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
    status: boolean;
}

// interfaccia in entrata su server per EDIT user
export interface EditUserData {
    nome: string;
    cognome: string;
    email: string;
    password: string;
}
export interface DTO_user_change_status {
    status: boolean;
    idUser: string;
}

export interface DTO_Data_User_Edit {
    _id: string;
    nome: string;
    cognome: string;
    email: string;
    password: string;
}

// // lo UserAppService riceve una user repository tipizzare in questo modo, ovvero contenente uesti metodi :
//TIPIZZAZIONE DEI METODI DELLA USER REPOSITORY
export interface IUserRepository {
    checkForDuplicate(nome: string, email: string, id?: string): Promise<boolean | Error>;
    Save(user: ICleanUser): Promise<IMongooseUser | null | Error>;
    getAllUsers(): Promise<IMongooseUser[] | Error>;
    saveUserChanges(data: IUser): Promise<string | Error>;
    findById(id: string): Promise<IMongooseUser | Error>;
    changeStatus(user: IUser): Promise<Error | string>;
}
