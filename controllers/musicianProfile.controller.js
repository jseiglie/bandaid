const MusicianProfileClass = require("../class/musicianProfile.class.js");
const responseObject = require("../utils/response.js");

const musicianProfileController = {};

musicianProfileController.getProfileByUserId = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const profile = await MusicianProfileClass.getProfileByUserId(user_id);
    res
      .status(200)
      .send(responseObject(200, true, "Musician profile fetched successfully", profile));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

musicianProfileController.createProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const profile = await MusicianProfileClass.createProfile(profileData);
    res
      .status(201)
      .send(responseObject(201, true, "Musician profile created successfully", profile));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

musicianProfileController.updateProfile = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const profileData = req.body;
    const profile = await MusicianProfileClass.updateProfile(user_id, profileData);
    res
      .status(200)
      .send(responseObject(200, true, "Musician profile updated successfully", profile));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

musicianProfileController.deleteProfile = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const profile = await MusicianProfileClass.deleteProfile(user_id);
    res
      .status(200)
      .send(responseObject(200, true, "Musician profile deleted successfully", profile));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = musicianProfileController;