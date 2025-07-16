const express = require("express");
const songController = require("../controllers/song.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", songController.getSongs);
router.get("/:id", songController.getSongById);
router.post("/", tokenMiddleware, songController.createSong);
router.put("/:id", tokenMiddleware, songController.updateSong);
router.delete("/:id", tokenMiddleware, songController.deleteSong);




module.exports = {
    router,
    path: "/songs"
}