require("dotenv").config();
LivesModel = require("../models").Lives;

module.exports = class Lives {
  constructor() {}

  static async getLives() {
    try {
      const response = await LivesModel.findAll();
      if (!response) {
        throw new Error("No live performances found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching live performances:", error);
      throw error;
    }
  }

  static async getLiveById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await LivesModel.findOne({
        where: { id },
      });
      if (!response) {
        throw new Error("No live performance found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching live performance by ID:", error);
      throw error;
    }
  }

  static async createLive(liveData) {
    try {
      if (
        !liveData ||
        !liveData.date_time ||
        !liveData.city ||
        !liveData.venue
      ) {
        throw new Error("Date, city, and venue are required");
      }
      const response = await LivesModel.create(liveData);
      return response;
    } catch (error) {
      console.error("Error creating live performance:", error);
      throw error;
    }
  }

  static async updateLive(id, liveData) {
    try {
      if (!id || !liveData) {
        throw new Error("ID and live performance data are required");
      }
      const response = await LivesModel.update(liveData, {
        where: { id },
      });
      if (!response[0]) {
        throw new Error("No live performance found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating live performance:", error);
      throw error;
    }
  }

  static async deleteLive(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await LivesModel.destroy({
        where: { id },
      });
      if (!response) {
        throw new Error("No live performance found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting live performance:", error);
      throw error;
    }
  }
};
