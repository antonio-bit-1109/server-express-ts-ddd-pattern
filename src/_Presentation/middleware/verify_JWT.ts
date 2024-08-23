import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { IDecodedToken } from "../../interfaces/interfaces";

dotenv.config();

const verify_Jwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(req.headers);

        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (typeof authHeader !== "string") {
            return res.status(401).json({ message: "Bearer Token non in formato stringa. Ricontrolla" });
        }

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "controlla il Bearer token. Unautorized." });
        }

        const token = authHeader.split(" ")[1];
        //
        // console.log(token);
        //
        jwt.verify(token, process.env.SECRET_FIRMA_TOKEN || "default_secret_token", async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Forbidden. errore. Token scaduto." });

            const decodedToken = decoded as IDecodedToken;

            req.userId = decodedToken.UserInfo.userId;
            req.nomeutente = decodedToken.UserInfo.nomeUser;
            req.IsActive = decodedToken.UserInfo.isActive;
            req.roles = decodedToken.UserInfo.roles;

            next();
        });
    } catch (err) {
        next(err);
    }
};

export { verify_Jwt };
