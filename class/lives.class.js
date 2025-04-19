require("dotenv").config();
const LivesModel = require("../models").Lives;
module.exports = class Lives {
  constructor() {
   
  }

  static async getLives() {
    try {
      const response = await LivesModel.findAll();
      if (!response) {
        throw new Error("No lives found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching lives:", error);
      throw error;
    }
  }
}