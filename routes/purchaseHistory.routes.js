const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseHistory.controller.js");
const { tokenMiddleware } = require("../middleware/auth.middleware.js");

router.get("/history", tokenMiddleware, purchaseController.getPurchaseHistory);
router.post("/new", tokenMiddleware, purchaseController.addPurchase);



module.exports = {
    router,
    path: "/purchase_history"
}
