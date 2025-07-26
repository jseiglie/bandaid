const Carts = require("../models/").Carts;
const CartItems = require("../models/").CartItems;
const Bands = require("../models/").Bands;
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

      let carts = await Carts.findOne({
        where: { user_id: userId },
        include: [{ model: CartItems }],
      });

      if (!carts) {
        carts = await this.createCartForUser(userId);
      }

      carts = carts.toJSON();
      if (!carts.CartItems) {
        carts.CartItems = [];
        return carts;
      }

      carts.CartItems = await Promise.all(
        carts.CartItems.map(async (cartItem) => {
          const merchandise = await Merchandise.findOne({
            where: { id: cartItem.merchandise_id },
            include: [{ model: Bands, attributes: ["name"] }],
          });

          if (!merchandise) return null;

          return {
            id: merchandise.id,
            name: merchandise.name,
            description: merchandise.description,
            price: merchandise.price,
            stock: merchandise.stock,
            imageUrl: merchandise.imageUrl,
            timesSold: merchandise.timesSold,
            isAvailable: merchandise.isAvailable,
            category_id: merchandise.category_id,
            createdAt: merchandise.createdAt,
            updatedAt: merchandise.updatedAt,
            owner: merchandise.Band?.name || null,
          };
        })
      );

      carts.CartItems = carts.CartItems.filter((item) => item !== null);

      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCartItems(cartId) {
    try {
      if (!cartId) {
        throw new Error("Cart ID is required");
      }
      const cart = await Carts.findByPk(cartId, {
        include: [{ model: CartItems, include: [Merchandise] }],
      });
      if (!cart) {
        throw new Error("No cart found with this ID");
      }
      return cart.CartItems;
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
