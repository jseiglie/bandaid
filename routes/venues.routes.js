const express = require("express");
const venuesController = require("../controllers/venues.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", venuesController.getVenues);
router.post("/", tokenMiddleware, venuesController.createVenue);
router.put("/:id", tokenMiddleware, venuesController.updateVenue);
router.delete("/:id", tokenMiddleware, venuesController.deleteVenue);

module.exports = {
    router,
    path: "/venues"
};
