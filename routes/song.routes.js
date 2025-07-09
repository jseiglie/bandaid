const express = require("express");
const songController = require("../controllers/song.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", songController.getSongs);
router.get("/:id", songController.getSongById);
router.post("/", songController.createSong);
router.put("/:id", songController.updateSong);
router.delete("/:id", songController.deleteSong);



module.exports = router;