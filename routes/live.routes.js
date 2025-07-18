const express = require("express");
const liveController = require("../controllers/live.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", liveController.getLives);
router.get("/:id", liveController.getLiveById);
router.post("/", tokenMiddleware, liveController.createLive);
router.put("/:id", tokenMiddleware, liveController.updateLive);
router.delete("/:id", tokenMiddleware, liveController.deleteLive);



module.exports = {
    router,
    path: "/lives"
}