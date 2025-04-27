const express = require("express");
const bandController = require("../controllers/band.controller");
const router = express.Router();

router.get("/bands", bandController.getBands);


module.exports = router;