import express from "express";
import { container } from "../../_dependency_inject/inversify.config";
import { BookController_class } from "../controllers/BookController_Class";
import { TYPES } from "../../_dependency_inject/types";
import { Request, Response, NextFunction } from "express";
import { verify_Jwt } from "../middleware/verify_JWT";
import multer from "multer";
import path from "path";
// import fs from "fs"

const BookController = container.get<BookController_class>(TYPES.BOOK_CONTROLLER);

const router = express.Router();

//configurazione Multer
//scelta della destinazione del file una volta salvata
const storageFunc = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/temp")); // Specifica la cartella di destinazione CARTELLA TEMPORANEA
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Specifica il nome del file
    },
});

const upload = multer({ storage: storageFunc });

//prettier-ignore
router.route("/").get(verify_Jwt, (req: Request, res: Response, next: NextFunction) => BookController.getAllBooks(req, res, next));
//prettier-ignore
router.route("/").post((req: Request, res: Response, next: NextFunction) => BookController.createBook(req, res, next));
//prettier-ignore
// edit dei dati del book escluso il caricamento/modifica dell immagine di copertina
router.route("/edit").post(verify_Jwt , (req: Request, res: Response, next: NextFunction) => BookController.editBook(req,res,next))
//prettier-ignore
router.route("/uploadBookImg").post(verify_Jwt, upload.single("imageFile") ,(req: Request, res: Response, next: NextFunction) => BookController.editImgBook(req, res, next));
// router.route("/edit/:id").post(BookController.EditBook);
// router.route("/")
// router.route("/").get(userController.GetAllUsers);
// router.route("/").post(userController.CreateNewUser);

export default router;
