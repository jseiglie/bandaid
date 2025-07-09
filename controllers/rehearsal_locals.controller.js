const rehearsalClass = require('../class/rehearsal_locals.class.js');
const responseObject = require('../utils/response.js');
const rehearsal_localController = {};

rehearsal_localController.getRehearsalLocals = async (req, res) => {
  try {
    console.log("Fetching rehearsals...");
    const resp = await rehearsalClass.getRehearsalLocals();
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

rehearsal_localController.getRehearsalLocalById = async (req, res) => {
  try {
    const rehearsalId = req.params.id;
    const resp = await rehearsalClass.getRehearsalLocalById(rehearsalId);
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

rehearsal_localController.createRehearsalLocal = async (req, res) => {
  try {
    const rehearsalData = req.body;
    const resp = await rehearsalClass.createRehearsalLocal(rehearsalData);
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

rehearsal_localController.updateRehearsalLocal = async (req, res) => {
    try {
    const rehearsalId = req.params.id;
    const rehearsalData = req.body;
    const resp = await rehearsalClass.updateRehearsalLocal(rehearsalId, rehearsalData);
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

rehearsal_localController.deleteRehearsalLocal = async (req, res) => {
  try {
    const rehearsalId = req.params.id;
    const resp = await rehearsalClass.deleteRehearsalLocal(rehearsalId);
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

module.exports = rehearsal_localController;