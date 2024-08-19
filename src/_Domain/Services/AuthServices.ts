import { IUserRepository } from "../../interfaces/interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { takeSecretKey } from "../../utils/utilityFunctions";

class AuthServices {
    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async autenticate(email: string, password: string) {
        try {
            // trovo lo ser a partire dalla mail
            const user = await this.userRepository.findByEmail(email);
            if (user instanceof Error) {
                throw user;
            }
            //confronto che la psw criptata e quella inviata dal client combacino
            const isPswMatching = await bcrypt.compare(user.Password, password);
            if (!isPswMatching) {
                throw new Error("Errore : Le password non corrispondono AuthServices - autenticate");
            }

            process.env.SECRET_FIRMA_TOKEN;
            // se tutto ok uso le info dello user per creare un token
            const token = jwt.sign(
                {
                    UserInfo: {
                        userId: user._id,
                        nomeUser: user.Nome,
                        isActive: user.IsActive,
                    },
                },
                process.env.SECRET_FIRMA_TOKEN || "default_secret",
                { expiresIn: "10m" }
            );

            return token;
        } catch (err) {
            return err;
        }
        //   const user = await this.userRepository.autenticateUser(username, password);
    }
}

export default AuthServices;
