const express = require("express");
const liveController = require("../controllers/live.controller");
const router = express.Router();

router.get("/lives", liveController.getLives);


module.exports = router;