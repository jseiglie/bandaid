const express = require("express");
const bandTagsRelController = require("../controllers/bandTagsRel.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", bandTagsRelController.getBandTagsRel);
router.post("/", tokenMiddleware, bandTagsRelController.createBandTagsRel);
router.put("/:id", tokenMiddleware, bandTagsRelController.updateBandTagsRel);
router.delete("/:id", tokenMiddleware, bandTagsRelController.deleteBandTagsRel);

module.exports = {
    router,
    path: "/bandtagsrel"
};
