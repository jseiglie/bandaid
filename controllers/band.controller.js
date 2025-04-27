const bandClass = require("../class/bands.class.js");
const responseObject = require("../utils/response.js");
const bandController = {};

bandController.getBands = async (req, res) => {
  try {
    console.log("Fetching bands...");
    const bands = await bandClass.getBands();
    res
      .status(200)
      .send(responseObject(200, true, "Bands fetched successfully", bands));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.getBandById = async (req, res) => {
  try {
    const bandId = req.params.id;
    const band = await bandClass.getBandById(bandId);
    res
      .status(200)
      .send(responseObject(200, true, "Band fetched successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.createBand = async (req, res) => {
  try {
    const bandData = req.body;
    const band = await bandClass.createBand(bandData);
    res
      .status(201)
      .send(responseObject(201, true, "Band created successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.updateBand = async (req, res) => {
  try {
    const bandId = req.params.id;
    const bandData = req.body;
    const band = await bandClass.updateBand(bandId, bandData);
    res
      .status(200)
      .send(responseObject(200, true, "Band updated successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.deleteBand = async (req, res) => {
  try {
    const bandId = req.params.id;
    const band = await bandClass.deleteBand(bandId);
    res
      .status(200)
      .send(responseObject(200, true, "Band deleted successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.getBandByName = async (req, res) => {
  try {
    const bandName = req.params.name;
    const band = await bandClass.getBandByName(bandName);
    res
      .status(200)
      .send(responseObject(200, true, "Band fetched successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.getBandByGenre = async (req, res) => {
  try {
    const bandGenre = req.params.genre;
    const band = await bandClass.getBandByGenre(bandGenre);
    res
      .status(200)
      .send(responseObject(200, true, "Band fetched successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.getBandByLocation = async (req, res) => {
  try {
    const bandLocation = req.params.location;
    const band = await bandClass.getBandByLocation(bandLocation);
    res
      .status(200)
      .send(responseObject(200, true, "Band fetched successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.getBandByDate = async (req, res) => {
  try {
    const bandDate = req.params.date;
    const band = await bandClass.getBandByDate(bandDate);
    res
      .status(200)
      .send(responseObject(200, true, "Band fetched successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.getBandByTime = async (req, res) => {
  try {
    const bandTime = req.params.time;
    const band = await bandClass.getBandByTime(bandTime);
    res
      .status(200)
      .send(responseObject(200, true, "Band fetched successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.getBandByVenue = async (req, res) => {
  try {
    const bandVenue = req.params.venue;
    const band = await bandClass.getBandByVenue(bandVenue);
    res
      .status(200)
      .send(responseObject(200, true, "Band fetched successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.getBandByTicketPrice = async (req, res) => {
  try {
    const bandTicketPrice = req.params.ticketPrice;
    const band = await bandClass.getBandByTicketPrice(bandTicketPrice);
    res
      .status(200)
      .send(responseObject(200, true, "Band fetched successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.getBandByTicketAvailability = async (req, res) => {
  try {
    const bandTicketAvailability = req.params.ticketAvailability;
    const band = await bandClass.getBandByTicketAvailability(
      bandTicketAvailability
    );
    res
      .status(200)
      .send(responseObject(200, true, "Band fetched successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandController.getBandsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const band = await bandClass.getBandByUserId(userId);
    res
      .status(200)
      .send(responseObject(200, true, "Band fetched successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};
bandController.getBandByCountry = async (req, res) => {
  try {
    const bandCountry = req.params.country;
    const band = await bandClass.getBandByCountry(bandCountry);
    res
      .status(200)
      .send(responseObject(200, true, "Band fetched successfully", band));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = bandController;
