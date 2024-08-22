"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inversify_config_1 = require("../../_dependency_inject/inversify.config");
const types_1 = require("../../_dependency_inject/types");
const AuthController = inversify_config_1.container.get(types_1.TYPES.AUTH_CONTROLLER);
const router = express_1.default.Router();
router.route("/").post((req, res, next) => AuthController.autenticate(req, res, next));
router.route("/").get((req, res, next) => AuthController.refresh(req, res, next));
//prettier-ignore
router.route("/logout").post((req, res, next) => AuthController.logout(req, res, next));
// router.route("/sendEmailChangeStatusAccount").post(userController.sendEmailtoConfirmChangeStatusAccount);
// router.route("/editStatusAccount/:token").get(userController.editStatusAccount);
// router.route("/editEmailUser").patch(verifyJWT, userController.editEmailUser);
// router.route("/singleUser").get(verifyJWT, userController.GetUserById);
// router.route("/reActiveAccount").post(userController.ReActivateAccount);
// module.exports = router;
exports.default = router;
