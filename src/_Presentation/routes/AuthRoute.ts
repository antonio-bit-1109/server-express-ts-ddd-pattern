import express from "express";
import AuthController from "../controllers/AuthController";
// const authController = require("../controllers/authController");
// const loginLimiter = require("../middleware/loginLimiter");
const router = express.Router();

router.route("/").post(AuthController.autenticate);
router.route("/").get(AuthController.refresh);
router.route("/").post(AuthController.logout);
// router.route("/").post(BookController.createBook);
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
export default router;
