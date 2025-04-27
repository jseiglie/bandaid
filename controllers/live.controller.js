const liveClass = require("../class/lives.class.js");
const responseObject = require("../utils/response.js");
const liveController = {};

liveController.getLives = async (req, res) => {
  try {
    console.log("Fetching bands...");
    const resp = await liveClass.getLives();
    res
      .status(200)
      .send(responseObject(200, true, "Lives fetched successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

liveController.getLiveById = async (req, res) => {
  try {
    const liveId = req.params.id;
    const resp = await liveClass.getLiveById(liveId);
    res
      .status(200)
      .send(responseObject(200, true, "Live fetched successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

liveController.createLive = async (req, res) => {
  try {
    const liveData = req.body;
    const resp = await liveClass.createLive(liveData);
    res
      .status(201)
      .send(responseObject(201, true, "Live created successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

liveController.updateLive = async (req, res) => {
  try {
    const liveId = req.params.id;
    const liveData = req.body;
    const resp = await liveClass.updateLive(liveId, liveData);
    res
      .status(200)
      .send(responseObject(200, true, "Live updated successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

liveController.deleteLive = async (req, res) => {
  try {
    const liveId = req.params.id;
    const resp = await liveClass.deleteLive(liveId);
    res
      .status(200)
      .send(responseObject(200, true, "Live deleted successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = liveController;
