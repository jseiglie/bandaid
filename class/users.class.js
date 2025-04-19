require("dotenv").config();
UsersModel = require("../models").Users;
module.exports = class Users {
  constructor() {
   
  }

  static async getUsers() {
    try {
      const response = await UsersModel.findAll();    
      if (!response) {
        throw new Error("No users found");
      }
      return response
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}