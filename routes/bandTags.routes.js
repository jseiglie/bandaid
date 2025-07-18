const express = require("express");
const bandTagsController = require("../controllers/bandTags.controller.js");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", bandTagsController.getAll);
router.post("/", tokenMiddleware, bandTagsController.create);
router.put("/:id", tokenMiddleware, bandTagsController.update);
router.delete("/:id", tokenMiddleware, bandTagsController.delete);

module.exports = {
    router,
    path: "/bandtags"
};
