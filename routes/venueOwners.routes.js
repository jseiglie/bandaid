const express = require("express");
const venueOwnersController = require("../controllers/venueOwners.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", venueOwnersController.getVenueOwners);
router.post("/", tokenMiddleware, venueOwnersController.createVenueOwner);
router.put("/:id", tokenMiddleware, venueOwnersController.updateVenueOwner);
router.delete("/:id", tokenMiddleware, venueOwnersController.deleteVenueOwner);

module.exports = {
    router,
    path: "/venueowners"
};
