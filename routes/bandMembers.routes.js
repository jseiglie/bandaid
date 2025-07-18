const express = require("express");
const bandMemberController = require("../controllers/bandMembers.controller.js");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", bandMemberController.getBandMembers);
router.get("/:id", bandMemberController.getBandMemberById);
router.post("/", tokenMiddleware, bandMemberController.createBandMember);
router.put("/:id", tokenMiddleware, bandMemberController.updateBandMember);
router.delete("/:id", tokenMiddleware, bandMemberController.deleteBandMember);


module.exports = {
    router,
    path: "/band_members"
}