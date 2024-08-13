"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_js_1 = __importDefault(require("../controllers/UserController.js"));
// const authController = require("../controllers/authController");
// const loginLimiter = require("../middleware/loginLimiter");
const router = express_1.default.Router();
router.route("/").post(UserController_js_1.default.createUser);
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
