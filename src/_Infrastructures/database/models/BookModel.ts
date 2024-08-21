import mongoose from "mongoose";
import { IMoongooseBook } from "../../../interfaces/interfaces";

const bookSchema = new mongoose.Schema({
    NomeLibro: {
        type: String,
        required: true,
    },

    PrezzoLibro: {
        type: Number,
        required: true,
    },

    Autore: {
        type: String,
        required: true,
    },

    PagineLibro: {
        type: Number,
        required: true,
    },

    CopertinaRigida: {
        type: Boolean,
        required: true,
    },

    TematicaLibro: {
        type: String,
        required: true,
    },

    ImgCopertina: {
        type: String,
        required: true,
        default: "default.gif",
    },
});

const BookModel = mongoose.model<IMoongooseBook>("BookModel", bookSchema);

export default BookModel;
