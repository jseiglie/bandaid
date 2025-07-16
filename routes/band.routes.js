const express = require("express");
const bandController = require("../controllers/band.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", bandController.getBands);
router.get("/:id", bandController.getBandById);
router.get("/name/:band_name", bandController.getBandByBandName);
router.post("/", tokenMiddleware, bandController.createBand);
router.put("/:id", tokenMiddleware, bandController.updateBand);
router.delete("/:id", tokenMiddleware, bandController.deleteBand);
router.post('/band_admin', tokenMiddleware, bandController.changeBandAdmin);



module.exports = {
    router,
    path: "/bands"
};