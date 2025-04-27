const songClass = require("../class/songs.class.js");
const responseObject = require("../utils/response.js");
const songController = {};

songController.getSongs = async (req, res) => {
  try {
    console.log("Fetching songs...");
    const bands = await songClass.getSongs();
    res
      .status(200)
      .send(responseObject(200, true, "Songs fetched successfully", bands));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

songController.getSongById = async (req, res) => {
  try {
    const songId = req.params.id;
    const song = await songClass.getSongById(songId);
    res
      .status(200)
      .send(responseObject(200, true, "Song fetched successfully", song));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

songController.createSong = async (req, res) => {
  try {
    const songData = req.body;
    const song = await songClass.createSong(songData);
    res
      .status(201)
      .send(responseObject(201, true, "Song created successfully", song));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

songController.updateSong = async (req, res) => {
  try {
    const songId = req.params.id;
    const songData = req.body;
    const song = await songClass.updateSong(songId, songData);
    res
      .status(200)
      .send(responseObject(200, true, "Song updated successfully", song));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

songController.deleteSong = async (req, res) => {
  try {
    const songId = req.params.id;
    const song = await songClass.deleteSong(songId);
    res
      .status(200)
      .send(responseObject(200, true, "Song deleted successfully", song));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = songController;
