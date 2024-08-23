import { injectable, inject } from "inversify";
import { AuthServices } from "../../_Domain/Services/AuthServices";
import { TYPES } from "../../_dependency_inject/types";
import { Request, Response, NextFunction } from "express";

@injectable()
class AuthController_Class {
    private authServices: AuthServices;
    constructor(@inject(TYPES.AUTH_SERVICES) authServices_DEPEND: AuthServices) {
        this.authServices = authServices_DEPEND;
    }

    public async autenticate(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "email o password mancante." });
            }

            const tokensObj = await this.authServices.autenticateHandler(email, password);
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
    }

    public async refresh(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const cookie = req.cookies;

            if (!cookie?.jwt)
                return res.status(401).json({ message: "Unauthorized. non stai fornendo il cookie per il refresh ? " });

            const refreshToken: string = cookie.jwt;

            const resultRefreshAction = await this.authServices.refreshTokenHandler(refreshToken);

            if (typeof resultRefreshAction !== "string") {
                throw resultRefreshAction;
            }

            return res.json({ token: resultRefreshAction });
        } catch (err) {
            next(err);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
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
    }
}

export { AuthController_Class };
