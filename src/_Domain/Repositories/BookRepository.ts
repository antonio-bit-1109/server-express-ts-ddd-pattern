import { Model } from "mongoose";
import { IcleanBook, IMoongooseBook } from "../../interfaces/interfaces";
// import UserModel from "../../_Infrastructures/database/models/UserModel";

class BookRepository {
    private BookModel: Model<IMoongooseBook>;

    constructor(BookModel: Model<IMoongooseBook>) {
        this.BookModel = BookModel;
    }

    //prettier-ignore
    async createBook(data :IcleanBook) :  Promise<Error | IMoongooseBook> {

        try {
          const savedBook = await this.BookModel.create({
            NomeLibro : data.nomeBook , 
            PrezzoLibro : data.prezzoBook,
            Autore : data.autoreBook , 
            PagineLibro : data.pagineBook , 
            CopertinaRigida : data.isCopertinaRigida, 
            TematicaLibro : data.tematica
        })
        if (!savedBook){
            throw new Error("creazione del libro fallita. BookRepository - createBook")
        }

        return savedBook  
        } catch (err) {
            return new Error(`Errore nel repository durante la creazione del libro: ${err}`);
        }
        
    }
}

export default BookRepository;
