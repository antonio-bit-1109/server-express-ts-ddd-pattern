import { Request, Response, NextFunction } from "express";
import AuthServices from "../../_Domain/Services/AuthServices";
import UserRepository from "../../_Domain/Repositories/UserRepository";
import UserModel from "../../_Infrastructures/database/models/UserModel";
import { IObjTokens } from "../../interfaces/interfaces";

const userRepository = new UserRepository(UserModel);
const authServices = new AuthServices(userRepository);

const autenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "email o password mancante." });
        }
        const tokensObj = await authServices.autenticate(email, password);
        if (tokensObj instanceof Error) {
            throw tokensObj;
        }

        const { token, refreshToken }: any = tokensObj;

        res.cookie(
            "jwt",
            { refreshToken },
            {
                httpOnly: true,
                // secure: true,
                // sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }
        );
        return res.status(200).json({ accessToken: { token } });
    } catch (err) {
        next(err);
    }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookie = req.cookies;

        if (!cookie.jwt) {
            return res.sendStatus(204); // no content
        }

        res.clearCookie("jwt", { httpOnly: true /*sameSite: "none", secure: true*/ });

        return res.status(200).json({ message: "cookie cleared" });
    } catch (err) {
        next(err);
    }
};

export default { autenticate, refresh, logout };
