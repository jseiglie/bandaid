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

module.exports = liveController;
