const rehearsal = require("../class/rehearsals.class.js");
const responseObject = require("../utils/response.js");
const rehearsalController = {};

rehearsalController.getRehearsals = async (req, res) => {
  try {
    const bandId = req.params.band_id;
    if (!bandId) {  
      return res
        .status(400)
        .send(responseObject(400, false, "Band ID is required", null));
    }
    const resp = await rehearsal.getBandRehearsals(bandId);
    res
      .status(200)
      .send(responseObject(200, true, "Rehearsals fetched successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
}

rehearsalController.getLocalRehearsals = async (req, res) => {
  try {
    const localId = req.params.local_id;
    if (!localId) {
      return res
        .status(400)
        .send(responseObject(400, false, "Local ID is required", null));
    }
    const resp = await rehearsal.getLocalRehearsals(localId);
    res
      .status(200)
      .send(responseObject(200, true, "Local rehearsals fetched successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
}

rehearsalController.getRehearsalById = async (req, res) => {
  try {
    const rehearsalId = req.params.id;
    if (!rehearsalId) {
      return res
        .status(400)
        .send(responseObject(400, false, "Rehearsal ID is required", null));
    }
    const resp = await rehearsal.getRehearsalById(rehearsalId);
    res
      .status(200)
      .send(responseObject(200, true, "Rehearsal fetched successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
}

rehearsalController.createRehearsal = async (req, res) => {
  try {
    const rehearsalData = req.body;
    if (!rehearsalData || !rehearsalData.band_id || !rehearsalData.local_id) {
      return res
        .status(400)
        .send(responseObject(400, false, "Band ID and Local ID are required", null));
    }
    const resp = await rehearsal.createRehearsal(rehearsalData);
    res
      .status(201)
      .send(responseObject(201, true, "Rehearsal created successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
}

rehearsalController.getRehearsalsByBandAndLocal = async (req, res) => {
  try {
    const bandId = req.params.band_id;
    const localId = req.params.local_id;
    if (!bandId || !localId) {
      return res
        .status(400)
        .send(responseObject(400, false, "Band ID and Local ID are required", null));
    }
    const resp = await rehearsal.getRehearsalsByBandAndLocal(bandId, localId);
    res
      .status(200)
      .send(responseObject(200, true, "Rehearsals fetched successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
}

rehearsalController.newBandRehearsal = async (req, res) => {
  try {
    const bandId = req.params.band_id;
    const rehearsalData = req.body;
    if (!bandId || !rehearsalData) {
      return res
        .status(400)
        .send(responseObject(400, false, "Band ID and Rehearsal data are required", null));
    }
    const resp = await rehearsal.newBandRehearsal(bandId, rehearsalData);
    res
      .status(201)
      .send(responseObject(201, true, "New band rehearsal created successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
}

rehearsalController.updateRehearsal = async (req, res) => {
  try {
    const rehearsalId = req.params.id;
    const rehearsalData = req.body;
    if (!rehearsalId || !rehearsalData) {
      return res
        .status(400)
        .send(responseObject(400, false, "Rehearsal ID and data are required", null));
    }
    const resp = await rehearsal.updateRehearsal(rehearsalId, rehearsalData);
    res
      .status(200)
      .send(responseObject(200, true, "Rehearsal updated successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
}

rehearsalController.deleteRehearsal = async (req, res) => {
  try {
    const rehearsalId = req.params.id;
    if (!rehearsalId) {
      return res
        .status(400)
        .send(responseObject(400, false, "Rehearsal ID is required", null));
    }
    const resp = await rehearsal.deleteRehearsal(rehearsalId);
    res
      .status(200)
      .send(responseObject(200, true, "Rehearsal deleted successfully", resp));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
}

module.exports = rehearsalController;