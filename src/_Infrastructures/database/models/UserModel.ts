import mongoose from "mongoose";
import { IMongooseUser } from "../../../interfaces/interfaces";

const userSchema = new mongoose.Schema({
    Nome: {
        type: String,
        required: true,
    },
    Cognome: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: true,
    },

    Password: {
        type: String,
        required: true,
    },
    IsActive: {
        type: Boolean,
        default: true,
    },

    Ruoli: {
        type: [String],
        default: ["utente"],
    },
});

const UserModel = mongoose.model<IMongooseUser>("UserModel", userSchema);

export default UserModel;
// export { IUser };
