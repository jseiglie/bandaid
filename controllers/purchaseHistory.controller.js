const PurchaseClass = require("../class/purchaseHistory.class.js");
const responseObject = require("../utils/response.js");

const purchaseController = {};

purchaseController.getPurchaseHistory = async (req, res) => {
  const { id } = req.user;

  try {
    const purchaseHistory = await PurchaseClass.getCartByUserId(id);

    if (!purchaseHistory) {
      return res
        .status(404)
        .responseObject(404, false, "No purchase history found", null);
    }
    return res
      .status(200)
      .responseObject(
        200,
        true,
        "Purchase history fetched successfully",
        purchaseHistory
      );
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    return res
      .status(500)
      .responseObject(500, false, "Internal server error", null);
  }
};

purchaseController.addPurchase = async (req, res) => {
  const { id } = req.user;
  const purchaseData = {
    userId: id,
    merchandiseId: req.body.merchandiseId,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
    status: req.body.status || "pending",
    transactionId: req.body.transactionId,
  };

  if (
    !purchaseData.merchandiseId ||
    !purchaseData.quantity ||
    !purchaseData.totalPrice
  ) {
    return res
      .status(400)
      .responseObject(
        400,
        false,
        "Merchandise ID, quantity, and total price are required",
        null
      );
  }

  try {
    const newPurchase = await PurchaseClass.completePurchase(purchaseData);
    return res
      .status(201)
      .responseObject(
        201,
        true,
        "Purchase completed successfully",
        newPurchase
      );
  } catch (error) {
    console.error("Error completing purchase:", error);
    return res
      .status(500)
      .responseObject(500, false, "Internal server error", null);
  }
};

module.exports = purchaseController;
