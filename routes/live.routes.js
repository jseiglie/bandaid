const express = require("express");
const liveController = require("../controllers/live.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", liveController.getLives);
router.get("/:id", liveController.getLiveById);
router.post("/", liveController.createLive);
router.put("/:id", liveController.updateLive);
router.delete("/:id", liveController.deleteLive);



module.exports = {
    router,
    path: "/lives"
}