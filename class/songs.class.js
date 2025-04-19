require("dotenv").config();
const SongsModel = require("../models").Songs;

module.exports = class Songs {
  constructor() {
   
  }

  static async getSongs() {
    try {
      const response = await SongsModel.findAll();    
      if (!response) {
        throw new Error("No songs found");
      }
      return response
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw error;
    }
  }
}