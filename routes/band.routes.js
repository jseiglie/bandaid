const express = require("express");
const bandController = require("../controllers/band.controller");
const router = express.Router();

router.get("/bands", bandController.getBands);
router.get("/bands/:id", bandController.getBandById);
router.post("/bands", bandController.createBand);
router.put("/bands/:id", bandController.updateBand);
router.delete("/bands/:id", bandController.deleteBand);



module.exports = router;