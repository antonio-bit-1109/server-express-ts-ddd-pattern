"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inversify_config_1 = require("../../_dependency_inject/inversify.config");
const types_1 = require("../../_dependency_inject/types");
const verify_JWT_1 = require("../middleware/verify_JWT");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// import fs from "fs"
const BookController = inversify_config_1.container.get(types_1.TYPES.BOOK_CONTROLLER);
const router = express_1.default.Router();
//configurazione Multer
//scelta della destinazione del file una volta salvata
const storageFunc = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../../public/temp")); // Specifica la cartella di destinazione CARTELLA TEMPORANEA
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Specifica il nome del file
    },
});
const upload = (0, multer_1.default)({ storage: storageFunc });
//prettier-ignore
router.route("/").get(verify_JWT_1.verify_Jwt, (req, res, next) => BookController.getAllBooks(req, res, next));
//prettier-ignore
router.route("/").post((req, res, next) => BookController.createBook(req, res, next));
//prettier-ignore
// edit dei dati del book escluso il caricamento/modifica dell immagine di copertina
router.route("/edit").post(verify_JWT_1.verify_Jwt, (req, res, next) => BookController.editBook(req, res, next));
//prettier-ignore
router.route("/uploadBookImg").post(verify_JWT_1.verify_Jwt, upload.single("imageFile"), (req, res, next) => BookController.editImgBook(req, res, next));
//prettier-ignore
router.route("/scrapingRandomInfo").get(
/* verify_Jwt, */ (req, res, next) => BookController.doingWebScraping(req, res, next));
// facciamo finta che url sia questo : /dummyFetch?dummyKey1=dummyValue1&dummyKey2=dummyValue2
router
    .route("/dummyFetch/dummy")
    .get((req, res, next) => BookController.DummyFetch(req, res, next));
// router.route("/edit/:id").post(BookController.EditBook);
// router.route("/")
// router.route("/").get(userController.GetAllUsers);
// router.route("/").post(userController.CreateNewUser);
exports.default = router;
