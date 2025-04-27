const express = require("express");
const bandMemberController = require("../controllers/bandMembers.controller.js");
const router = express.Router();

router.get("/band_members", bandMemberController.getBandMembers);
router.get("/band_members/:id", bandMemberController.getBandMemberById);
router.post("/band_members", bandMemberController.createBandMember);
router.put("/band_members/:id", bandMemberController.updateBandMember);
router.delete("/band_members/:id", bandMemberController.deleteBandMember);

module.exports = router;