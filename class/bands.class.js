require("dotenv").config();
const BandModel = require("../models").Bands;
module.exports = class Band {
  constructor() {
   
  }

  static async getBands() {
    try {
      const response = await BandModel.findAll();
      if (!response) {
        throw new Error("No bands found");
      }
      return response
    } catch (error) {
      console.error("Error fetching bands:", error);
      throw error;
    }
    
  }
}