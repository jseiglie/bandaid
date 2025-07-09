const express = require("express");
const liveController = require("../controllers/live.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/lives", liveController.getLives);
router.get("/lives/:id", liveController.getLiveById);
router.post("/lives", liveController.createLive);
router.put("/lives/:id", liveController.updateLive);
router.delete("/lives/:id", liveController.deleteLive);


module.exports = router;