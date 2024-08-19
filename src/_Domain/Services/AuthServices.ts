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
            console.log(email, password);
            // trovo lo ser a partire dalla mail
            const user = await this.userRepository.findByEmail(email);
            if (user instanceof Error) {
                throw user;
            }

            //confronto che la psw criptata e quella inviata dal client combacino
            const isPswMatching = bcrypt.compareSync(password, user.Password);
            if (!isPswMatching) {
                throw new Error("Errore : Le password non corrispondono AuthServices - autenticate");
            }

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

            const refreshToken = jwt.sign(
                { username: user.Nome },
                process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
                {
                    expiresIn: "7d",
                }
            );
            return { token, refreshToken };
        } catch (err) {
            return err;
        }
        //   const user = await this.userRepository.autenticateUser(username, password);
    }
}

export default AuthServices;
