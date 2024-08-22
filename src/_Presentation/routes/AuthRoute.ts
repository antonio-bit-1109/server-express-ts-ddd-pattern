import express from "express";
import { container } from "../../_dependency_inject/inversify.config";
import { AuthController_Class } from "../controllers/AuthController_Class";
import { TYPES } from "../../_dependency_inject/types";
import { Request, Response, NextFunction } from "express";

const AuthController = container.get<AuthController_Class>(TYPES.AUTH_CONTROLLER);

const router = express.Router();

router.route("/").post((req: Request, res: Response, next: NextFunction) => AuthController.autenticate(req, res, next));
router.route("/").get((req: Request, res: Response, next: NextFunction) => AuthController.refresh(req, res, next));
//prettier-ignore
router.route("/logout").post( (req:Request,res:Response,next:NextFunction) => AuthController.logout(req,res,next));

// router.route("/sendEmailChangeStatusAccount").post(userController.sendEmailtoConfirmChangeStatusAccount);
// router.route("/editStatusAccount/:token").get(userController.editStatusAccount);

// router.route("/editEmailUser").patch(verifyJWT, userController.editEmailUser);

// router.route("/singleUser").get(verifyJWT, userController.GetUserById);

// router.route("/reActiveAccount").post(userController.ReActivateAccount);
// module.exports = router;
export default router;
