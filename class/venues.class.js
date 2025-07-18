
require("dotenv").config();
const VenuesModel = require("../models").venues;

module.exports = class Venues {
  static async getAll() {
    try {
      const response = await VenuesModel.findAll();
      if (!response) {
        throw new Error("No venues found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching venues:", error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await VenuesModel.findByPk(id);
      if (!response) {
        throw new Error("No venue found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching venue by ID:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      if (!data) {
        throw new Error("Venue data is required");
      }
      const response = await VenuesModel.create(data);
      return response;
    } catch (error) {
      console.error("Error creating venue:", error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      if (!id || !data) {
        throw new Error("ID and venue data are required");
      }
      const response = await VenuesModel.update(data, { where: { id } });
      if (!response[0]) {
        throw new Error("No venue found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating venue:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await VenuesModel.destroy({ where: { id } });
      if (!response) {
        throw new Error("No venue found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting venue:", error);
      throw error;
    }
  }
};
