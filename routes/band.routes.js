const express = require("express");
const bandController = require("../controllers/band.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/bands", bandController.getBands);
router.get("/bands/:id", bandController.getBandById);
router.get("/bands/name/:band_name", bandController.getBandByBandName);
router.post("/bands", tokenMiddleware, bandController.createBand);
router.put("/bands/:id", tokenMiddleware, bandController.updateBand);
router.delete("/bands/:id", tokenMiddleware, bandController.deleteBand);



module.exports = router;