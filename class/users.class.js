require("dotenv").config();
UsersModel = require("../models").Users;
const bcrypt = require("bcrypt");
const randomUsername = require("../utils/randomUsername");
const responseObject = require("../utils/response");
const jwt = require("jsonwebtoken");
const bandController = require("../controllers/band.controller.js");
const Bands = require("./bands.class");
const BandMembers = require("../class/bandMembers.class.js");
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "Pw#u=z>y9Cq@s7+Fk3LZGVe<}&-AdBW?./h!;%8$nx]H~*S6rv";

module.exports = class Users {
  constructor() {}

  static generateToken(userId, expires) {
    try {
      const expirationDate = {};
      if (!expires) {
        expirationDate.expiresIn = "1d";
      }
      return jwt.sign({ id: userId }, JWT_SECRET, expirationDate); // Customize expiration as needed
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Verify JWT Token
  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  }

  static getId(token) {
    try {
      if (this.verifyToken(token)) {
        const { id } = jwt.verify(token, JWT_SECRET);
        return id;
      }
    } catch (error) {
      console.error("Error getting ID from token:", error);
      return { success: false, error: error.message };
    }
  }

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
  static async checkPassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error("Error checking password:", error);
      return { success: false, error: error.message };
    }
  }
  static async login(username, email, password) {
    try {
      let userbyEmail;
      let userbyUsername;
      userbyEmail = await UsersModel.findOne({
        where: { email },
      });

      if (!userbyEmail) {
        userbyUsername = await UsersModel.findOne({
          where: { username },
        });
        if (!userbyUsername) {
          throw new Error("Invalid username/email or password");
        }
      }
      const user = userbyEmail || userbyUsername;

      const passwordMatch = await this.checkPassword(password, user.password);

      if (!passwordMatch) throw new Error("Wrong password and/or email");

      // Remeber to remove the password before returning
      delete user.dataValues.password;
      // Resolving band and band members for logged in user
      const userBandsQuery = await Bands.getBandsByUserId(user.dataValues.id);
      const userBands = await Promise.all(
        userBandsQuery.map(async (band) => {
          const bandData = await Bands.getBandById(band.dataValues.band_id);

          //Band members for each band
          const BandMembersQuery = await BandMembers.getBandMembersByBandId(
            band.dataValues.band_id
          );
          const BandMembersData = await Promise.all(
            BandMembersQuery.map(async (member) => {
              return await Users.getUserById(member.dataValues.user_id);
            })
          );

          // Add BandMembers to the band object
          bandData.dataValues.bandMembers = BandMembersData;
          return bandData;
        })
      );

      user.dataValues.bands = userBands;

      return { user, token: this.generateToken(user.dataValues.id, "1d") };
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
  static async register(username, email, password) {
    try {
      if (!email || !password) {
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
        password: hashedPassword,
      });
      delete user.dataValues.password;

      return {
        user,
        token: this.generateToken(user.id, "1d"),
      };
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }
};
