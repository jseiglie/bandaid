
const express = require("express");
const cartsController = require("../controllers/carts.controller");
const { tokenMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/add", tokenMiddleware, cartsController.addItem);
router.delete("/remove/:cartItemId", tokenMiddleware, cartsController.removeItem);

module.exports = router;