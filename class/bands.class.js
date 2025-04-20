require("dotenv").config();
BandsModel = require("../models").Bands;

module.exports = class Bands {
  constructor() {}

  static async getBands() {
    try {
      const response = await BandsModel.findAll();
      if (!response) {
        throw new Error("No bands found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching bands:", error);
      throw error;
    }
  }

  static async getBandById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await BandsModel.findOne({
        where: { id },
      });
      if (!response) {
        throw new Error("No band found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band by ID:", error);
      throw error;
    }
  }

  static async createBand(bandData) {
    try {
      if (!bandData || !bandData.name || !bandData.genre) {
        throw new Error("Band name and genre are required");
      }
      const response = await BandsModel.create(bandData);
      return response;
    } catch (error) {
      console.error("Error creating band:", error);
      throw error;
    }
  }

  static async updateBand(id, bandData) {
    try {
      if (!id || !bandData) {
        throw new Error("ID and band data are required");
      }
      const response = await BandsModel.update(bandData, {
        where: { id },
      });
      if (!response[0]) {
        throw new Error("No band found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating band:", error);
      throw error;
    }
  }

  static async deleteBand(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await BandsModel.destroy({
        where: { id },
      });
      if (!response) {
        throw new Error("No band found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting band:", error);
      throw error;
    }
  }
};
