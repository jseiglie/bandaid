const express = require("express");
const venueScoresController = require("../controllers/venueScores.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", venueScoresController.getAll);
router.post("/", tokenMiddleware, venueScoresController.create);
router.put("/:id", tokenMiddleware, venueScoresController.update);
router.delete("/:id", tokenMiddleware, venueScoresController.delete);

module.exports = {
    router,
    path: "/venuescores"
};
