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

    public async refreshTokenHandler(refreshToken: string): Promise<any> {
        try {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET || "default_secret",
                async (err: VerifyErrors | null, decoded: any | undefined) => {
                    try {
                        if (err) {
                            console.log("si è verificato un errore...");
                            throw err;
                        }

                        if (decoded) {
                            console.log("token decodificato...");
                            const user: IMongooseUserId | Error = await this.userRepository.findById(
                                decoded.UserInfo.userId
                            );

                            if (!user) {
                                throw new Error("utente non trovato al momento della verifica del token di refresh");
                            }
                            if (user instanceof Error) {
                                throw user;
                            }

                            const newAccessToken = jwt.sign(
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

                            return newAccessToken;
                        }
                    } catch (err) {
                        if (err instanceof Error) {
                            throw err;
                        }
                        throw new Error("errore durante la verifica del token - Auth Services");
                    }
                }
            );
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
            throw new Error("errore durante il refresh del token - Auth Services");
        }
    }
}

export { AuthServices };
