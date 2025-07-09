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
  static async login({ username, email, password }) {
    try {
      let user =
        (await UsersModel.findOne({
          where: { email },
        })) ||
        (await UsersModel.findOne({
          where: { username },
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
      console.log(user);
      const userBands = await this.getUserBandsWithMembers(user.id);

      if (userBands) {
        const musicianProfile = await MusicianProfile.getProfileByUserId(
          user.id
        );
        if (musicianProfile && musicianProfile.social_links) {
          musicianProfile.social_links = JSON.parse(
            musicianProfile.social_links
          );
        }
        user.bands = userBands;
        user.profile = musicianProfile;
      }

      return { user, token: this.generateToken(user.id, "1d") };
    } catch (error) {
      console.error("Error logging in:", error);
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
        const musicianProfile = await MusicianProfile.getProfileByUserId(user.id);
        if (musicianProfile && musicianProfile.social_links) {
          musicianProfile.social_links = JSON.parse(musicianProfile.social_links);
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

  static async register(email, password, username = null, role = 'user', admin = false, avatar = null) {
    try {
      if (!email || !password) {
        throw new Error("Username, email, and password are required");
      }
      // Check if the email already exists
      const existingEmail = await UsersModel.findOne({
        where: { email },
      });
      if (existingEmail) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await this.hash(password);

      const newUser = await UsersModel.create({
        email,
        password: hashedPassword,
        username: randomUsername(email),
        role,
        admin,
        avatar
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
