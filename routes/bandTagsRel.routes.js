const express = require("express");
const bandTagsRelController = require("../controllers/bandTagsRel.controller");
const router = express.Router();
const {tokenMiddleware} = require("../middleware/auth.middleware");

router.get("/", bandTagsRelController.getAll);
router.post("/", tokenMiddleware, bandTagsRelController.create);
router.put("/:id", tokenMiddleware, bandTagsRelController.update);
router.delete("/:id", tokenMiddleware, bandTagsRelController.delete);

module.exports = {
    router,
    path: "/bandtagsrel"
};
