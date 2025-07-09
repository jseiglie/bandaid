const express = require("express");
const router = express.Router();
const { tokenMiddleware } = require("../middleware/auth.middleware");
const rehearsalsController = require("../controllers/rehearsals.controller");

router.get("/band/:band_id", rehearsalsController.getRehearsals);
router.get("/:id", rehearsalsController.getRehearsalById);
router.get("/local/:local_id", rehearsalsController.getLocalRehearsals);
router.get("/band/:band_id/local/:local_id", rehearsalsController.getRehearsalsByBandAndLocal);
router.post("/", rehearsalsController.createRehearsal);
router.put("/:id", rehearsalsController.updateRehearsal);
router.delete("/:id", rehearsalsController.deleteRehearsal);
router.post("/new/:band_id", rehearsalsController.newBandRehearsal);

module.exports = router;
