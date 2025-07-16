require("dotenv").config();
UsersModel = require("../models").Users;
const bcrypt = require("bcrypt");
const randomUsername = require("../utils/randomUsername");
const responseObject = require("../utils/response");
const jwt = require("jsonwebtoken");
const bandController = require("../controllers/band.controller.js");
const Bands = require("./bands.class");
const BandMembers = require("../class/bandMembers.class.js");
const MusicianProfile = require("../class/musicianProfile.class.js");
const { Lives } = require("../models");
const { Op } = require("sequelize");
const { tokenGenerator, invalidateToken } = require("../middleware/auth.middleware.js");
const bandMembers = require("../models/BandMembers.js");
const UserSubscriptions = require("../models/userSubscriptions.js");
const Carts = require("./carts.class.js");
module.exports = class Users {
  constructor() {}

  static async logout(token) {
    try {
      invalidateToken(token, true);
      return { success: true, message: "Logout successful" };
    } catch (error) {
      console.error("Error during logout:", error);
      return { success: false, error: error.message };
    }
  }

  static async avatarUpdate(data) {
    try {
      if (!data) {
        throw new Error("missing information to update avatar");
      }
      const user = await UsersModel.update(
        { avatar: data.avatar, avatar_public_id: data.avatar_public_id },
        {
          where: { id: data.id },
        }
      );
      return user;
    } catch (error) {
      console.error("Error updating user avatar:", error);
      throw error;
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
        return {
          success: false,
          message: "No user found with this email",
          status: 404,
        };
      }
      return user;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return {
        success: false,
        error: error.message,
        status: error.status || 500,
      };
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
  static async login({ username, email, password }) {
    try {
      let user =
        (await UsersModel.findOne({
          where: { email },
        })) ||
        (await UsersModel.findOne({
          where: { username }, include: ["MusicianProfile", "Carts", "UserSubscriptions"] 
        }));

      if (!user) {
        throw new Error("Invalid username/email or password");
      }

      const passwordMatch = await this.checkPassword(password, user.password);
      if (!passwordMatch) {
        throw new Error("Wrong password and/or email");
      }
      // Remove password from user object
      user = user.toJSON();
      const musicianProfile = await MusicianProfile.getProfileByUserId(user.id);
      if (!musicianProfile) {
        user.profile = null;
      } else {
        if (musicianProfile && musicianProfile.social_links) {
          musicianProfile.social_links = JSON.parse(
            musicianProfile.social_links
          );
        }
        user.profile = musicianProfile.toJSON();
      }
      const userBands = await this.getMusicianBands(musicianProfile.id);
      user.bands = userBands;

      const userCarts = await Carts.getUserCarts(user.id);
      user.cart = userCarts;

      return {
        user,
        token: tokenGenerator(
          {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          "2d"
        ),
      };
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  static async getMusicianBands(musician_id) {
    try {
      if (!musician_id) {
        throw new Error("User ID is required");
      }
      const userBands = await BandMembers.getAllUserBands(musician_id);

      return userBands || []; // Return an empty array if no bands found
    } catch (error) {
      console.error("Error fetching musician bands:", error);
      throw error;
    }
  }

  // get bands and their members
  static async getUserBandsWithMembers(userId) {
    try {
      const userBandsQuery = await Bands.getBandsByUserId(userId);

      return await Promise.all(
        userBandsQuery.map(async (band) => {
          const bandData = await Bands.getBandById(band.dataValues.band_id);

          const bandMembers = await this.getBandMembersWithProfiles(
            band.dataValues.band_id
          );

          // Fetch the next live event for the band
          const nextLive = await Lives.findOne({
            where: {
              band_id: band.dataValues.band_id,
              date_time: { [Op.gt]: new Date() }, // Only future events
            },
            order: [["date_time", "ASC"]], // Get the closest future event
          });

          bandData.dataValues.bandMembers = bandMembers;
          bandData.dataValues.nextLive = nextLive;
          return bandData;
        })
      );
    } catch (error) {
      console.error("Error fetching user bands with members:", error);
      throw error;
    }
  }

  // get band members and their profiles
  static async getBandMembersWithProfiles(bandId) {
    try {
      const bandMembersQuery = await BandMembers.getBandMembersByBandId(bandId);

      return await Promise.all(
        bandMembersQuery.map(async (member) => {
          // Fetch user details
          const user = await Users.getUserById(member.dataValues.user_id);

          // Fetch musician profile for the user
          const musicianProfile = await MusicianProfile.getProfileByUserId(
            user.id
          );
          if (musicianProfile && musicianProfile.social_links) {
            musicianProfile.social_links = JSON.parse(
              musicianProfile.social_links
            );
          }

          // Add profile to the user object
          user.dataValues.profile = musicianProfile;

          // Add band member role to the user object
          user.dataValues.role = member.dataValues.role;

          return user;
        })
      );
    } catch (error) {
      console.error("Error fetching band members with profiles:", error);
      throw error;
    }
  }

  static async register(
    email,
    password,
    username = null,
    role = "user",
    admin = false,
    avatar = null
  ) {
    try {
      if (!email || !password) {
        throw new Error("Username, email, and password are required");
      }
      // Check if the email already exists
      // const existingEmail = await UsersModel.findOne({
      //   where: { email },
      // });
      // if (existingEmail) {
      //   throw new Error("Email already exists");
      // }

      //const hashedPassword = await this.hash(password);

      const newUser = await UsersModel.create({
        email,
        password,
        username: randomUsername(email),
        role,
        admin,
        avatar,
      });
      // return the created user object without the password
      const user = newUser.toJSON();
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
};
