const express = require("express");
const cloudinaryController = require("../controllers/cloudinary.controller");
const multerMiddleware = require("../middleware/multer.middleware");
const { tokenMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();



router.post("/upload", tokenMiddleware, multerMiddleware.upload.single("image"), cloudinaryController.uploadImage);
router.delete("/delete", tokenMiddleware, cloudinaryController.deleteImage);

module.exports = router;