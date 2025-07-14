const CartsClass = require("../class/carts.class");

const responseObject = require("../utils/response.js");
const cartsController = {};

cartsController.addItem = async (req, res) => {
  const { merchandiseId, quantity } = req.body;
  const id = req.user.id;
  try {
    if (!userId || !merchandiseId || !quantity) {
      return res
        .status(400)
        .responseObject(
          400,
          false,
          "User ID, merchandise ID, and quantity are required",
          null
        );
    }
    const cart = await CartsClass.addItem(id, merchandiseId, quantity);

    res
      .status(200)
      .responseObject(200, true, "Item added to cart successfully", cart);
  } catch (error) {
    res.status(500).responseObject(500, false, "Internal server error", null);
  }
};

cartsController.removeItem = async (req, res) => {
  const { cartItemId } = req.params;
  try {
    await CartsClass.removeItem(cartItemId);
  } catch (error) {
    res.status(500).responseObject(500, false, "Internal server error", null);
  }
};

module.exports = cartsController;
