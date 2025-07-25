const Carts = require("../models/").Carts;
const CartItems = require("../models/").CartItems;

const Merchandise = require("../models/").Merchandise;

module.exports = class CartsClass {
  constructor() {}

  static async createCartForUser(userId) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const cart = await Carts.create({ user_id: userId });
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUserCarts(userId) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const carts = await Carts.findAll({ where: { user_id: userId }, include: [{ model: CartItems }] });
      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addItem(userId, merchandiseId, quantity) {
    try {
      if (!userId || !merchandiseId || !quantity) {
        throw new Error("User ID, merchandise ID, and quantity are required");
      }
      let cart = await Carts.findOne({ where: { user_id: userId } });
      if (!cart) {
        cart = await Carts.create({ user_id: userId });
      }

      const [cartItem, created] = await CartItems.findOrCreate({
        where: { cart_id: cart.id, merchandise_id: merchandiseId },
        defaults: { quantity },
      });

      if (!created) {
        cartItem.quantity += quantity;
        await cartItem.save();
      }

      return { success: true, cartItem };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async removeItem(cartItemId) {
    try {
      if (!cartItemId) {
        throw new Error("Cart item ID are required");
      }
      const cartItem = await CartItems.findByPk(cartItemId);
      if (!cartItem) {
        throw new Error("No cart item found with this ID");
      }
      await cartItem.destroy();
      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
