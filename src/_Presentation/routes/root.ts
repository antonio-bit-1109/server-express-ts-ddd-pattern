import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//  configura una rotta che risponde alle richieste GET all'URL radice (/), /index, e /index.html, inviando il file index.html come risposta.
router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// router.get("/userStatusChangeFailed", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "views", "UserStatusChanges_Failed.html"));
// });

// router.get("/userStatusChangeSuccess", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "views", "UserStatusChanges_Success.html"));
// });

export default router;
// module.exports = router;
