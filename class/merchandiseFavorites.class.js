const MerchFav = require("../models/").MerchandiseFavorites;

module.exports = class MerchandiseFavorites {
  static async getFavoritesByUserId(user_id) {
    try {
      if (!user_id) {
        throw new Error("User ID is required");
      }
      const favorites = await MerchFav.findAll({
        where: { user_id },
        include: [
          {
            model: Merchandise,
            attributes: ["id", "name", "description", "price", "image_url"],
          },
        ],
      });
      return favorites;
    } catch (error) {
      console.error("Error fetching merchandise favorites:", error);
      throw error;
    }
  }

  static async addMerchandiseToFavorites(merchandise_id, user_id) {
    try {
      if (!merchandise_id || !user_id) {
        throw new Error("Merchandise ID and User ID are required");
      }
      const favorite = await MerchFav.create({
        merchandise_id,
        user_id,
      });
      return favorite;
    } catch (error) {
      console.error("Error adding merchandise to favorites:", error);
      throw error;
    }
  }
  static async removeMerchandiseFromFavorites(merchandise_id, user_id) {
    try {
      if (!merchandise_id || !user_id) {
        throw new Error("Merchandise ID and User ID are required");
      }
      const result = await MerchFav.destroy({
        where: { merchandise_id, user_id },
      });
      return result > 0;
    } catch (error) {
      console.error("Error removing merchandise from favorites:", error);
      throw error;
    }
  }
  static async getFavoritesCount(merchandise_id) {
    try {
      if (!merchandise_id) {
        throw new Error("Merchandise ID is required");
      }
      const count = await MerchFav.count({
        where: { merchandise_id },
      });
      return count;
    } catch (error) {
      console.error("Error counting merchandise favorites:", error);
      throw error;
    }
  }
  static async getAllFavoritesCountForBandMerchandise(band_id) {
    try {
      if (!band_id) {
        throw new Error("Band ID is required");
      }
      const count = await MerchFav.count({
        include: [
          {
            model: Merchandise,
            where: { owner: band_id },
          },
        ],
      });
      return count;
    } catch (error) {
      console.error(
        "Error counting all favorites for band merchandise:",
        error
      );
      throw error;
    }
  }
};
