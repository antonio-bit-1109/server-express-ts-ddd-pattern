// import { IUser } from "../_Infrastructures/database/models/UserModel";
import { NumericType, ObjectId } from "mongodb";

//----------------------------------------------USER INTERFACES--------------------------------------------------------------------------------------------------------------------------

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
export interface IMongooseUserId {
    _id: ObjectId;
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
    create(user: ICleanUser): Promise<IMongooseUser | null | Error>;
    getAllUsers(): Promise<IMongooseUser[] | Error>;
    saveUserChanges(data: IUser): Promise<string | Error>;
    findById(id: string): Promise<IMongooseUser | Error>;
    changeStatus(user: IUser): Promise<Error | string>;
    // autenticateUser(username: string, password: string): Promise<Error | IMongooseUser>;
    findByEmail(email: string): Promise<Error | IMongooseUserId>;
}

//----------------------------------------------BOOK INTERFACES--------------------------------------------------------------------------------------------------------------------------

export interface IMoongooseBook extends Document {
    NomeLibro: string;
    PrezzoLibro: number;
    Autore: string;
    PagineLibro: number;
    CopertinaRigida: boolean;
    TematicaLibro: string;
}

export interface DTO_BOOK {
    nomeLibro: string;
    prezzoLibro: number;
    autoreLibro: string;
    pagine: number;
    isCopertinaRigida: boolean;
    tematica: string;
}

export interface IBookRepository {
    save(data: IcleanBook): Promise<Error | IMoongooseBook>;
    checkForDuplicate(titoloLibro: string, autore: string): Promise<Error | void>;
}

export interface IcleanBook {
    nomeBook: string;
    prezzoBook: number;
    autoreBook: string;
    pagineBook: number;
    isCopertinaRigida: boolean;
    tematica: string;
}

export interface IObjTokens {
    token: string;
    refreshToken: string;
}
