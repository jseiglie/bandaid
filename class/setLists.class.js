require("dotenv").config();
const SetListModel = require("../models").SetLists;
module.exports = class SetLists {
  constructor() {
   
  }

  static async getSetLists() {
    try {
      const response = await SetListModel.findAll();    
      if (!response) {
        throw new Error("No setlists found");
      }
      return response
    } catch (error) {
      console.error("Error fetching setlists:", error);
      throw error;
    }
  }
}