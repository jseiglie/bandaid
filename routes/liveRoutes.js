const express = require("express");
const liveController = require("../controllers/liveController");
const router = express.Router();

router.get("/lives", liveController.getLives);


module.exports = router;