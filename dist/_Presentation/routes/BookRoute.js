"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inversify_config_1 = require("../../_dependency_inject/inversify.config");
const types_1 = require("../../_dependency_inject/types");
// import BookController from "../controllers/BookController";
// const authController = require("../controllers/authController");
// const loginLimiter = require("../middleware/loginLimiter");
const BookController = inversify_config_1.container.get(types_1.TYPES.BOOK_CONTROLLER);
// const UserController = container.get<UserController_Class>(TYPES.USER_CONTROLLER);
const router = express_1.default.Router();
router.route("/").get((req, res, next) => BookController.getAllBooks(req, res, next));
router.route("/").post((req, res, next) => BookController.createBook(req, res, next));
// router.route("/edit/:id").post(BookController.EditBook);
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
