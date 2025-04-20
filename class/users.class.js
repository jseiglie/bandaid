require("dotenv").config();
UsersModel = require("../models").Users;
module.exports = class Users {
  constructor() {}

  static async getUsers() {
    try {
      const response = await UsersModel.findAll();
      if (!response) {
        throw new Error("No users found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await UsersModel.findOne({
        where: { id },
      });
      if (!response) {
        throw new Error("No user found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }
  static async updateUser(id, userData) {
    try {
      if (!id || !userData) {
        throw new Error("ID and user data are required");
      }
      const response = await UsersModel.update(userData, {
        where: { id },
      });
      if (!response) {
        throw new Error("No user found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  static async deleteUser(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      };
      const response = await UsersModel.destroy({
        where: { id },
      });
      if (!response) {
        throw new Error("No user found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      if (!email) {
        throw new Error("Email is required");
      }
      const response = await UsersModel.findOne({
        where: { email },
      });
      if (!response) {
        throw new Error("No user found with this email");
      }
      return response;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  }
  static async getUserByUsername(username) {
    try {
      if (!username) {
        throw new Error("Username is required");
      }
      // Check if the username is valid (e.g., not empty or null)
      const response = await UsersModel.findOne({
        where: { username },
      });
      if (!response) {
        throw new Error("No user found with this username");
      }
      return response;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw error;
    }
  }

  static async login(username, password) {
    try {
      if (!username || !password) {
        throw new Error("All fields are required");
      }
      const response = await UsersModel.findOne({
        where: { username, password },
      });
      if (!response) {
        throw new Error("Invalid username or password");
      }
      return response;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
  static async register(username, email, password) {
    try {
      if (!username || !email || !password) {
        throw new Error("All fields are required");
      }
      const response = await UsersModel.create({
        username,
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }
};
