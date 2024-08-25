import express from "express";
import { container } from "../../_dependency_inject/inversify.config";
import { BookController_class } from "../controllers/BookController_Class";
import { TYPES } from "../../_dependency_inject/types";
import { Request, Response, NextFunction } from "express";
import { verify_Jwt } from "../middleware/verify_JWT";

const BookController = container.get<BookController_class>(TYPES.BOOK_CONTROLLER);
// const UserController = container.get<UserController_Class>(TYPES.USER_CONTROLLER);

const router = express.Router();

//prettier-ignore
router.route("/").get(verify_Jwt, (req: Request, res: Response, next: NextFunction) => BookController.getAllBooks(req, res, next));
//prettier-ignore
router.route("/").post((req: Request, res: Response, next: NextFunction) => BookController.createBook(req, res, next));
//prettier-ignore
// edit dei dati del book escluso il caricamento/modifica dell immagine di copertina
router.route("/edit").post(/* verify_Jwt , */(req: Request, res: Response, next: NextFunction) => BookController.editBook(req,res,next) )
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
