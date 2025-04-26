require("dotenv").config();
const bcrypt = require("bcrypt");
const randomUsername = require("../utils/randomUsername");
UsersModel = require("../models").Users;
module.exports = class Users {
  constructor() {}

  static async getUsers() {
    try {
      const users = await UsersModel.findAll();
      if (!users) {
        throw new Error("No users found");
      }
      return users;
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
      const user = await UsersModel.findOne({
        where: { id },
      });
      if (!user) {
        throw new Error("No user found with this ID");
      }
      return user;
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
      const user = await UsersModel.update(userData, {
        where: { id },
      });
      if (!user) {
        throw new Error("No user found with this ID");
      }
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  static async deleteUser(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const user = await UsersModel.destroy({
        where: { id },
      });
      if (!user) {
        throw new Error("No user found with this ID");
      }
      return user;
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
      const user = await UsersModel.findOne({
        where: { email },
      });
      if (!user) {
        throw new Error("No user found with this email");
      }
      return user;
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

  static async hash(password) {
    try {
      const hash = await bcrypt.hash(password, 8);
      return hash; // Return the hashed password
    } catch (error) {
      console.error("Error hashing password:", error);
      return { success: false, error: error.message };
    }
  }

  // Check if the provided password matches the hashed password
  static async checkPassword(password, userPassword) {
    try {
      if (!password || !userPassword) throw new Error("Missing parameters");
      const isMatch = await bcrypt.compare(password, userPassword);
      return isMatch;
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return { success: false, error: error.message };
    }
  }

  static async login(username, password) {
    try {
      if (!username || !password) {
        throw new Error("All fields are required");
      }
      const user = await UsersModel.findOne({
        where: { username, password },
      });
      if (!user) {
        throw new Error("Invalid username or password");
      }
      // Check if the password is correct
      const passwordMatch = await this.checkPassword(password, user.password);
      if (!passwordMatch) throw new Error("Wrong password and/or email");

      // Omit the password before returning the user
      delete user.dataValues.password;
      const token = this.generateToken(user.id, keepMeLogged);
      return user;
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
      const existingUser = await UsersModel.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new Error("Email already exists");
      }

      // Hash the password before saving
      const hashedPassword = await this.hash(password);
      const user = await UsersModel.create({
        username: username || randomUsername(email),
        email,
        password:hashedPassword,
      });
      return user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }
};
