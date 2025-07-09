const express = require("express");
const songController = require("../controllers/song.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/songs", songController.getSongs);
router.get("/songs/:id", songController.getSongById);
router.post("/songs", songController.createSong);
router.put("/songs/:id", songController.updateSong);
router.delete("/songs/:id", songController.deleteSong);



module.exports = router;