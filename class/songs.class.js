require("dotenv").config();
SongsModel = require("../models").Songs;

module.exports = class Songs {
  constructor() {}

  static async getSongs() {
    try {
      const response = await SongsModel.findAll();
      if (!response) {
        throw new Error("No songs found");
      }
      return response;
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw error;
    }
  }

  static async getSongById(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await SongsModel.findOne({
        where: { id },
      });
      if (!response) {
        throw new Error("No song found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error fetching song by ID:", error);
      throw error;
    }
  }

  static async createSong(songData) {
    try {
      if (!songData || !songData.title || !songData.key) {
        throw new Error("Song title and key are required");
      }
      const response = await SongsModel.create(songData);
      return response;
    } catch (error) {
      console.error("Error creating song:", error);
      throw error;
    }
  }

  static async updateSong(id, songData) {
    try {
      if (!id || !songData) {
        throw new Error("ID and song data are required");
      }
      const response = await SongsModel.update(songData, {
        where: { id },
      });
      if (!response[0]) {
        throw new Error("No song found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error updating song:", error);
      throw error;
    }
  }

  static async deleteSong(id) {
    try {
      if (!id) {
        throw new Error("ID is required");
      }
      const response = await SongsModel.destroy({
        where: { id },
      });
      if (!response) {
        throw new Error("No song found with this ID");
      }
      return response;
    } catch (error) {
      console.error("Error deleting song:", error);
      throw error;
    }
  }
};
