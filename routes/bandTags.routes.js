const express = require("express");
const bandTagsController = require("../controllers/bandTags.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", bandTagsController.getBandTags);
router.post("/", tokenMiddleware, bandTagsController.createBandTag);
router.put("/:id", tokenMiddleware, bandTagsController.updateBandTag);
router.delete("/:id", tokenMiddleware, bandTagsController.deleteBandTag);

module.exports = {
    router,
    path: "/bandtags"
};
