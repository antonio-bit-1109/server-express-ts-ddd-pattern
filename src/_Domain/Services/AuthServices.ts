import { IDecodedToken, IMongooseUser, IMongooseUserId, IUserRepository } from "../../interfaces/interfaces";
import bcrypt from "bcrypt";
import { injectable, inject } from "inversify";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { TYPES } from "../../_dependency_inject/types";
// import { takeSecretKey } from "../../utils/utilityFunctions";

@injectable()
class AuthServices {
    private userRepository: IUserRepository;

    // constructor(userRepository: IUserRepository) {
    //     this.userRepository = userRepository;
    // }
    constructor(@inject(TYPES.USER_REPOSITORY) userRepository_DEPEND: IUserRepository) {
        this.userRepository = userRepository_DEPEND;
    }

    public async autenticateHandler(email: string, password: string) {
        try {
            // console.log(email, password);
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
                        roles: user.Ruoli,
                    },
                },
                process.env.SECRET_FIRMA_TOKEN || "default_secret",
                { expiresIn: "5s" }
            );

            const refreshToken = jwt.sign(
                { userId: user._id, username: user.Nome },
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

    public async refreshTokenHandler(refreshToken: string): Promise<string> {
        try {
            // console.log(refreshToken);
            if (typeof refreshToken !== "string") {
                throw new Error("Il token di refresh non è una stringa valida");
            }

            // la decodifica del token è asincrona quniid va aspettata con una promise.
            const decoded: any = await new Promise((resolve, reject) => {
                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET || "default_secret",
                    (err: VerifyErrors | null, decoded: any | undefined) => {
                        if (err) {
                            return reject(err as Error);
                        }
                        resolve(decoded);
                    }
                );
            });

            if (!decoded || !decoded.userId) {
                throw new Error("Token decodificato non valido");
            }
            console.log("token decodificato...");
            const user: IMongooseUserId | Error = await this.userRepository.findById(decoded.userId);

            // console.log(user);
            if (!user) {
                throw new Error("utente non trovato al momento della verifica del token di refresh");
            }
            if (user instanceof Error) {
                throw user;
            }

            const newAccessToken = jwt.sign(
                {
                    UserInfo: {
                        userId: user._id.toString(),
                        nomeUser: user.Nome,
                        isActive: user.IsActive,
                        roles: user.Ruoli,
                    },
                },
                process.env.SECRET_FIRMA_TOKEN || "default_secret",
                { expiresIn: "5s" }
            );

            return newAccessToken;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante il refresh del token - Auth Services");
        }
    }
}

export { AuthServices };
