import express from "express";
import "reflect-metadata";
import { container } from "../../_dependency_inject/inversify.config";
import { TYPES } from "../../_dependency_inject/types";
import { UserController_Class } from "../controllers/UserController_Class";
import { Request, Response, NextFunction } from "express";
const UserController = container.get<UserController_Class>(TYPES.USER_CONTROLLER);
// import UserController from "../controllers/UserController";
// const authController = require("../controllers/authController");
// const loginLimiter = require("../middleware/loginLimiter");
const router = express.Router();

router.route("/").post((req: Request, res: Response, next: NextFunction) => UserController.createUser(req, res, next));

// router.route("/").post(UserController.createUser);
// router.route("/").get(UserController.getAllUsers);
// router.route("/edit").post(UserController.editUser);
// router.route("/status").post(UserController.changeStatus);
//

// router.route("/")
// router.route("/").get(userController.GetAllUsers);
// router.route("/").post(userController.CreateNewUser);
// router.route("/editUsername").patch(verifyJWT, userController.editUserName);
// router.route("/editDataNascita").patch(verifyJWT, userController.editDataNascita);
// //prettier-ignore
// router.route("/editImgProfile")
//     .patch( verifyJWT,  fileUpload({ createParentPath: true }), fileSizeLimiter, userController.editImgProfile);

// router.route("/sendEmailChangeStatusAccount").post(userController.sendEmailtoConfirmChangeStatusAccount);
// router.route("/editStatusAccount/:token").get(userController.editStatusAccount);

// router.route("/editEmailUser").patch(verifyJWT, userController.editEmailUser);

// router.route("/singleUser").get(verifyJWT, userController.GetUserById);

// router.route("/reActiveAccount").post(userController.ReActivateAccount);
// module.exports = router;
export default router;
