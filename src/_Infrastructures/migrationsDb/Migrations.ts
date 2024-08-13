import UserModel from "../database/models/UserModel.js";

async function Add_CampoPassword_to_User() {
    try {
        console.log("migrazione in corso...");
        console.log("aggiunta campo password allo user...");
        const result = await UserModel.updateMany(
            { Password: { $exists: false } },
            { $set: { Password: "defaultPassword" } }
        );
        if (result) {
            console.log("migrazione eseguita.");
        }
    } catch (err) {
        console.log(err);
    }
}

export default { Add_CampoPassword_to_User };
