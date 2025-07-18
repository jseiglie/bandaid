
require("dotenv").config();
const BandTagsModel = require("../models").BandTags;

module.exports = class BandTags {
  static async getAll() {
    try {
      const response = await BandTagsModel.findAll();
      if (!response) {
        throw new Error("No band tags found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band tags:", error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await BandTagsModel.findByPk(id);
      if (!response) {
        throw new Error("No band tag found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching band tag by ID:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      if (!data || !data.name) {
        throw new Error("Tag name is required");
      }
      const response = await BandTagsModel.create(data);
      return response;
    } catch (error) {
      console.error("Error creating band tag:", error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      if (!id || !data) {
        throw new Error("ID and tag data are required");
      }
      const response = await BandTagsModel.update(data, { where: { id } });
      if (!response[0]) {
        throw new Error("No band tag found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating band tag:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await BandTagsModel.destroy({ where: { id } });
      if (!response) {
        throw new Error("No band tag found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting band tag:", error);
      throw error;
    }
  }
};
