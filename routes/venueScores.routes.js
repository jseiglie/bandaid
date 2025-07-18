const express = require("express");
const venueScoresController = require("../controllers/venueScores.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", venueScoresController.getVenueScores);
router.post("/", tokenMiddleware, venueScoresController.createVenueScore);
router.put("/:id", tokenMiddleware, venueScoresController.updateVenueScore);
router.delete("/:id", tokenMiddleware, venueScoresController.deleteVenueScore);

module.exports = {
    router,
    path: "/venuescores"
};
