// import { IUser } from "../_Infrastructures/database/models/UserModel";
import { JwtPayload } from "jsonwebtoken";
import { Document, NumericType, ObjectId } from "mongodb";

//----------------------------------------------USER INTERFACES--------------------------------------------------------------------------------------------------------------------------

// Interfaccia per rappresentare un utente nel database
export interface IUser {
    _id: ObjectId;
    nome: string;
    cognome: string;
    email: string;
    password: string;
    isActive: boolean;
    Ruoli: string[];
}

// Definisci l'interfaccia IMongooseUser peril modello che si interfaccia con mongoose
// sotto al cofano importa anche _id perche la proprietà _id è della classe Document
export interface IMongooseUser extends Document {
    Nome: string;
    Cognome: string;
    Email: string;
    Password: string;
    IsActive: boolean;
    Ruoli: string[];
}
export interface IMongooseUserId {
    _id: ObjectId;
    Nome: string;
    Cognome: string;
    Email: string;
    Password: string;
    IsActive: boolean;
    Ruoli: string[];
}

// tipo dati ricevuti al controller User per la creazione
export interface DataCreateUser {
    nome: string;
    cognome: string;
    email: string;
    password: string;
    ruoli: string[];
}

// Tipo di dati derivati da un'entità User per la persistenza
export interface ICleanUser {
    nome: string;
    cognome: string;
    email: string;
    password: string;
    status: boolean;
    ruoli: string[];
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
    ruoli: string[];
}

// // lo UserAppService riceve una user repository tipizzare in questo modo, ovvero contenente uesti metodi :
//TIPIZZAZIONE DEI METODI DELLA USER REPOSITORY
export interface IUserRepository {
    checkForDuplicate(nome: string, email: string, id?: string): Promise<boolean | Error>;
    create(user: ICleanUser): Promise<IMongooseUser | null | Error>;
    getAllUsers(): Promise<IMongooseUser[] | Error>;
    saveUserChanges(data: IUser): Promise<string | Error>;
    findById(id: string): Promise<IMongooseUserId | Error>;
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
    ImgCopertina: string;
}

export interface DTO_BOOK {
    nomeLibro: string;
    prezzoLibro: number;
    autoreLibro: string;
    pagine: number;
    isCopertinaRigida: boolean;
    tematica: string;
    imgCopertina: string;
}

export interface IBookRepository {
    save(data: IcleanBook): Promise<Error | IMoongooseBook>;
    checkForDuplicate(titoloLibro: string, autore: string): Promise<Error | void>;
    getAllBooks(): Promise<Error | IMoongooseBook[]>;
}

export interface IcleanBook {
    nomeBook: string;
    prezzoBook: number;
    autoreBook: string;
    pagineBook: number;
    isCopertinaRigida: boolean;
    tematica: string;
    imgCopertina: string;
}

export interface IObjTokens {
    token: string;
    refreshToken: string;
}

// ------------------------------TOKEN----------------------------------------

export interface IDecodedToken extends JwtPayload {
    UserInfo: {
        userId: string;
        nomeUser: string;
        isActive: boolean;
    };
    iat: number;
    exp: number;
}
