"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const inversify_config_1 = require("../../_dependency_inject/inversify.config");
const types_1 = require("../../_dependency_inject/types");
const verify_JWT_1 = require("../middleware/verify_JWT");
const UserController = inversify_config_1.container.get(types_1.TYPES.USER_CONTROLLER);
// import UserController from "../controllers/UserController";
// const authController = require("../controllers/authController");
// const loginLimiter = require("../middleware/loginLimiter");
const router = express_1.default.Router();
//prettier-ignore
router.route("/").get(verify_JWT_1.verify_Jwt, (req, res, next) => UserController.getAllUsers(req, res, next));
//prettier-ignore
router.route("/").post((req, res, next) => UserController.createUser(req, res, next));
//prettier-ignore
router.route("/edit").post((req, res, next) => UserController.editUser(req, res, next));
//prettier-ignore
router.route("/status").post((req, res, next) => UserController.changeStatus(req, res, next));
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
exports.default = router;
