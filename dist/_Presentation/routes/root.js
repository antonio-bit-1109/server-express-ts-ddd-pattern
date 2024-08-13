"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//  configura una rotta che risponde alle richieste GET all'URL radice (/), /index, e /index.html, inviando il file index.html come risposta.
router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "views", "index.html"));
});
// router.get("/userStatusChangeFailed", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "views", "UserStatusChanges_Failed.html"));
// });
// router.get("/userStatusChangeSuccess", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "views", "UserStatusChanges_Success.html"));
// });
exports.default = router;
// module.exports = router;
