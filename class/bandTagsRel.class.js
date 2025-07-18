
require("dotenv").config();
const BandTagsRelModel = require("../models").BandTagsRel;

module.exports = class BandTagsRel {
  static async getAll() {
    try {
      const response = await BandTagsRelModel.findAll();
      if (!response) {
        throw new Error("No band tags rel found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band tags rel:", error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await BandTagsRelModel.findByPk(id);
      if (!response) {
        throw new Error("No band tags rel found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band tags rel by ID:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      if (!data) {
        throw new Error("Data is required");
      }
      const response = await BandTagsRelModel.create(data);
      return response;
    } catch (error) {
      console.error("Error creating band tags rel:", error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      if (!id || !data) {
        throw new Error("ID and data are required");
      }
      const response = await BandTagsRelModel.update(data, { where: { id } });
      if (!response[0]) {
        throw new Error("No band tags rel found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating band tags rel:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await BandTagsRelModel.destroy({ where: { id } });
      if (!response) {
        throw new Error("No band tags rel found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting band tags rel:", error);
      throw error;
    }
  }
};
