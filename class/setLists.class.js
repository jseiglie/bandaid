require("dotenv").config();
SetListsModel = require("../models").SetLists;

module.exports = class SetLists {
  constructor() {}

  static async getSetLists() {
    try {
      const response = await SetListsModel.findAll();
      if (!response) {
        throw new Error("No setlists found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching setlists:", error);
      throw error;
    }
  }

  static async getSetListById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await SetListsModel.findOne({
        where: { id },
      });
      if (!response) {
        throw new Error("No setlist found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching setlist by ID:", error);
      throw error;
    }
  }

  static async createSetList(setListData) {
    try {
      if (!setListData || !setListData.name || !setListData.band_id) {
        throw new Error("Setlist name and band ID are required");
      }
      const response = await SetListsModel.create(setListData);
      return response;
    } catch (error) {
      console.error("Error creating setlist:", error);
      throw error;
    }
  }

  static async updateSetList(id, setListData) {
    try {
      if (!id || !setListData) {
        throw new Error("ID and setlist data are required");
      }
      const response = await SetListsModel.update(setListData, {
        where: { id },
      });
      if (!response[0]) {
        throw new Error("No setlist found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating setlist:", error);
      throw error;
    }
  }

  static async deleteSetList(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await SetListsModel.destroy({
        where: { id },
      });
      if (!response) {
        throw new Error("No setlist found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting setlist:", error);
      throw error;
    }
  }
};
