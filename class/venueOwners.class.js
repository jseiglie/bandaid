
require("dotenv").config();
const VenueOwnersModel = require("../models").VenueOwners;

module.exports = class VenueOwners {
  static async getAll() {
    try {
      const response = await VenueOwnersModel.findAll();
      if (!response) {
        throw new Error("No venue owners found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching venue owners:", error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await VenueOwnersModel.findByPk(id);
      if (!response) {
        throw new Error("No venue owner found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching venue owner by ID:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      if (!data) {
        throw new Error("Venue owner data is required");
      }
      const response = await VenueOwnersModel.create(data);
      return response;
    } catch (error) {
      console.error("Error creating venue owner:", error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      if (!id || !data) {
        throw new Error("ID and venue owner data are required");
      }
      const response = await VenueOwnersModel.update(data, { where: { id } });
      if (!response[0]) {
        throw new Error("No venue owner found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating venue owner:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await VenueOwnersModel.destroy({ where: { id } });
      if (!response) {
        throw new Error("No venue owner found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting venue owner:", error);
      throw error;
    }
  }
};
