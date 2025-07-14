const PurchaseHistory = require("../models").PurchaseHistory;

module.exports = class PurchaseClass {
  constructor() {}

  static async getPurchasesByUserId(user_id) {
    try {
      if (!user_id) {
        throw new Error("User ID is required");
      }
      const purchases = await PurchaseHistory.findAll({
        where: { user_id },
        include: [Merchandise],
      });

      if (!purchases) {
        throw new Error("No purchases found");
      }


      return purchases;
    } catch (error) {
      throw error;
    }
  }

  static async completePurchase(purchaseData) {
    try {
      if (!purchaseData.userId || !purchaseData.merchandiseId || !purchaseData.quantity) {
        throw new Error("User ID, Merchandise ID, and Quantity are required");
      }
      const purchase = await PurchaseHistory.create(purchaseData);
      if (!purchase) {
        throw new Error("Failed to complete purchase");
      }
      // Optionally, update the merchandise stock and timesSold
      const merchandise = await Merchandise.findByPk(purchaseData.merchandiseId);
      if (!merchandise) {
        throw new Error("No merchandise found with this ID");
      }
      merchandise.stock -= purchaseData.quantity;
      merchandise.timesSold += purchaseData.quantity;
      await merchandise.save();
      
      return purchase;
    } catch (error) {
      throw error;
    }
  }
};
