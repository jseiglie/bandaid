const express = require("express");
const songController = require("../controllers/song.controller");
const router = express.Router();

router.get("/songs", songController.getSongs);


module.exports = router;