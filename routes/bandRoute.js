const express = require("express");
const bandController = require("../controllers/bandController");
const router = express.Router();

router.get("/bands", bandController.getBands);


module.exports = router;