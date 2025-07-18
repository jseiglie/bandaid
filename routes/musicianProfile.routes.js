const express = require("express");
const musicianProfileController = require("../controllers/musicianProfile.controller.js");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/:user_id", musicianProfileController.getProfileByUserId);
router.post("/", tokenMiddleware, musicianProfileController.createProfile);
router.put("/:user_id", tokenMiddleware, musicianProfileController.updateProfile);
router.delete("/:user_id", tokenMiddleware, musicianProfileController.deleteProfile);


module.exports = {
    router,
    path: "/musician_profile"
}