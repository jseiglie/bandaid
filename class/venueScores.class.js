
require("dotenv").config();
const VenueScoresModel = require("../models").VenueScores;

module.exports = class VenueScores {
  static async getAll() {
    try {
      const response = await VenueScoresModel.findAll();
      if (!response) {
        throw new Error("No venue scores found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching venue scores:", error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await VenueScoresModel.findByPk(id);
      if (!response) {
        throw new Error("No venue score found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching venue score by ID:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      if (!data) {
        throw new Error("Venue score data is required");
      }
      const response = await VenueScoresModel.create(data);
      return response;
    } catch (error) {
      console.error("Error creating venue score:", error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      if (!id || !data) {
        throw new Error("ID and venue score data are required");
      }
      const response = await VenueScoresModel.update(data, { where: { id } });
      if (!response[0]) {
        throw new Error("No venue score found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating venue score:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await VenueScoresModel.destroy({ where: { id } });
      if (!response) {
        throw new Error("No venue score found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting venue score:", error);
      throw error;
    }
  }
};
