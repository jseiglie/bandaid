const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseHistory.controller.js");

router.get("/history", purchaseController.getPurchaseHistory);
router.post("/new", purchaseController.addPurchase);



module.exports = {
    router,
    path: "/purchase_history"
}
