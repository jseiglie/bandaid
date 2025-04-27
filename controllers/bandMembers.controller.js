const BandMembersClass = require("../class/bandMembers.class.js");
const responseObject = require("../utils/response.js");
const bandMemberController = {};

bandMemberController.getBandMembers = async (req, res) => {
  try {
    const bandMembers = await BandMembersClass.getBandMembers();
    res
      .status(200)
      .send(responseObject(200, true, "Band members fetched successfully", bandMembers));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandMemberController.getBandMemberById = async (req, res) => {
  try {
    const bandMemberId = req.params.id;
    const bandMember = await BandMembersClass.getBandMemberById(bandMemberId);
    res
      .status(200)
      .send(responseObject(200, true, "Band member fetched successfully", bandMember));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandMemberController.createBandMember = async (req, res) => {
  try {
    const bandMemberData = req.body;
    const bandMember = await BandMembersClass.createBandMember(bandMemberData);
    res
      .status(201)
      .send(responseObject(201, true, "Band member created successfully", bandMember));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandMemberController.updateBandMember = async (req, res) => {
  try {
    const bandMemberId = req.params.id;
    const bandMemberData = req.body;
    const bandMember = await BandMembersClass.updateBandMember(bandMemberId, bandMemberData);
    res
      .status(200)
      .send(responseObject(200, true, "Band member updated successfully", bandMember));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

bandMemberController.deleteBandMember = async (req, res) => {
  try {
    const bandMemberId = req.params.id;
    const bandMember = await BandMembersClass.deleteBandMember(bandMemberId);
    res
      .status(200)
      .send(responseObject(200, true, "Band member deleted successfully", bandMember));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = bandMemberController;