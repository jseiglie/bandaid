const express = require("express");
const venuesController = require("../controllers/venues.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", venuesController.getAll);
router.post("/", tokenMiddleware, venuesController.create);
router.put("/:id", tokenMiddleware, venuesController.update);
router.delete("/:id", tokenMiddleware, venuesController.delete);

module.exports = {
    router,
    path: "/venues"
};
