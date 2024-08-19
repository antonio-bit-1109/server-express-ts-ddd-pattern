import { Request, Response, NextFunction } from "express";
import AuthServices from "../../_Domain/Services/AuthServices";
import UserRepository from "../../_Domain/Repositories/UserRepository";
import UserModel from "../../_Infrastructures/database/models/UserModel";

const userRepository = new UserRepository(UserModel);
const authServices = new AuthServices(userRepository);

const autenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const token = await authServices.autenticate(email, password);
        if (typeof token !== "string") {
            throw token;
        }

        return res.status(200).json(token);
    } catch (err) {
        next(err);
    }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {};

const logout = async (req: Request, res: Response, next: NextFunction) => {};

export default { autenticate, refresh, logout };
