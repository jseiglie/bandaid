const SetListsClass = require("../class/setLists.class.js");
const responseObject = require("../utils/response.js");
const setListController = {};

setListController.getSetLists = async (req, res) => {
  try {
    console.log("Fetching bands...");
    const bands = await SetListsClass.getSetLists();
    res
      .status(200)
      .send(responseObject(200, true, "setLists fetched successfully", bands));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};
setListController.getSetListsByBandId = async (req, res) => {
  try {
    const bandId = req.params.bandId;
    const setLists = await SetListsClass.getSetListsByBandId(bandId);
    res
      .status(200)
      .send(responseObject(200, true, "setLists fetched successfully", setLists));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};
setListController.getSetListById = async (req, res) => {
  try {
    const setListId = req.params.id;
    const setList = await SetListsClass.getSetListById(setListId);
    res
      .status(200)
      .send(responseObject(200, true, "setList fetched successfully", setList));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

setListController.createSetList = async (req, res) => {
  try {
    const setListData = req.body;
    const setList = await SetListsClass.createSetList(setListData);
    res
      .status(201)
      .send(responseObject(201, true, "setList created successfully", setList));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

setListController.updateSetList = async (req, res) => {
  try {
    const setListId = req.params.id;
    const setListData = req.body;
    const setList = await SetListsClass.updateSetList(setListId, setListData);
    res
      .status(200)
      .send(responseObject(200, true, "setList updated successfully", setList));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

setListController.deleteSetList = async (req, res) => {
  try {
    const setListId = req.params.id;
    const setList = await SetListsClass.deleteSetList(setListId);
    res
      .status(200)
      .send(responseObject(200, true, "setList deleted successfully", setList));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = setListController;
