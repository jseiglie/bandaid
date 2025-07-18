const express = require("express");
const venueOwnersController = require("../controllers/venueOwners.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", venueOwnersController.getAll);
router.post("/", tokenMiddleware, venueOwnersController.create);
router.put("/:id", tokenMiddleware, venueOwnersController.update);
router.delete("/:id", tokenMiddleware, venueOwnersController.delete);

module.exports = {
    router,
    path: "/venueowners"
};
