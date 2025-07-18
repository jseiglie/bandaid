const express = require("express");
const router = express.Router();
const { tokenMiddleware } = require("../middleware/auth.middleware");
const rehearsalsController = require("../controllers/rehearsals.controller");

router.get("/band/:band_id", tokenMiddleware, rehearsalsController.getRehearsals);
router.get("/:id", tokenMiddleware, rehearsalsController.getRehearsalById);
router.get("/local/:local_id", tokenMiddleware, rehearsalsController.getLocalRehearsals);
router.get("/band/:band_id/local/:local_id", tokenMiddleware, rehearsalsController.getRehearsalsByBandAndLocal);
router.post("/", tokenMiddleware, rehearsalsController.createRehearsal);
router.put("/:id", tokenMiddleware, rehearsalsController.updateRehearsal);
router.delete("/:id", tokenMiddleware, rehearsalsController.deleteRehearsal);
router.post("/new/:band_id", tokenMiddleware, rehearsalsController.newBandRehearsal);


module.exports = {
    router,
    path: "/rehearsals"
}
