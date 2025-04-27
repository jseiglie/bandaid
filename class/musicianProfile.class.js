const MusicianProfileModel = require("../models").MusicianProfile;

module.exports = class MusicianProfile {
  constructor() {}

  static async getProfileByUserId(user_id) {
    try {
      if (!user_id) {
        throw new Error("User ID is required");
      }
      const profile = await MusicianProfileModel.findOne({
        where: { user_id },
      });
      if (!profile) {
        throw new Error("No musician profile found for this user");
      }
      return profile;
    } catch (error) {
      console.error("Error fetching musician profile:", error);
      throw error;
    }
  }

  static async createProfile(profileData) {
    try {
      if (!profileData || !profileData.user_id) {
        throw new Error("User ID is required to create a profile");
      }
      const profile = await MusicianProfileModel.create(profileData);
      return profile;
    } catch (error) {
      console.error("Error creating musician profile:", error);
      throw error;
    }
  }

  static async updateProfile(user_id, profileData) {
    try {
      if (!user_id || !profileData) {
        throw new Error("User ID and profile data are required");
      }
      const profile = await MusicianProfileModel.update(profileData, {
        where: { user_id },
      });
      if (!profile[0]) {
        throw new Error("No musician profile found for this user");
      }
      return profile;
    } catch (error) {
      console.error("Error updating musician profile:", error);
      throw error;
    }
  }

  static async deleteProfile(user_id) {
    try {
      if (!user_id) {
        throw new Error("User ID is required");
      }
      const profile = await MusicianProfileModel.destroy({
        where: { user_id },
      });
      if (!profile) {
        throw new Error("No musician profile found for this user");
      }
      return profile;
    } catch (error) {
      console.error("Error deleting musician profile:", error);
      throw error;
    }
  }
};