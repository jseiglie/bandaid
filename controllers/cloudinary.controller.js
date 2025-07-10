const Bands = require("../class/bands.class");
const cloudinaryClass = require("../class/cloudinary.class");
const Users = require("../class/users.class");
const responseObject = require("../utils/response");
const cloudinaryController = {};
const fs = require("fs");

cloudinaryController.uploadImage = async (req, res) => {
  try {
    console.log("Received file:", req.file);
    const { usage, band_id } = req.body;
    if (!usage) {
      return res
        .status(400)
        .send(responseObject(400, false, "Usage is required"));
    }
    if (!req.file) {
      return res
        .status(400)
        .send(responseObject(400, false, "No file uploaded"));
    }
    const result = await cloudinaryClass.uploadImage(req.file.path);

    // Delete the file after uploading to Cloudinary
    fs.unlinkSync(req.file.path);



    if (usage !== "avatar" && usage !== "logo" && usage !== "cover_photo") {
      await this.deleteImage(result.public_id);
      return res
        .status(400)
        .send(responseObject(400, false, "Invalid usage type"));
    }

    if (usage === "avatar") {
      Users.avatarUpdate({
        id: req.user.id,
        avatar: result.secure_url,
        avatar_public_id: result.public_id,
      });
    }

    if (usage === "logo") {
      Bands.updateBandLogo({
        id: band_id,
        logo: result.secure_url,
        logo_public_id: result.public_id,
      });
    }

    if (usage === "cover_photo") {
      Bands.updateBandCoverPhoto({
        band_id: band_id,
        cover_photo: result.secure_url,
        cover_photo_public_id: result.public_id,
      });
    }

    return res
      .status(200)
      .send(responseObject(200, true, "Image uploaded successfully", result));
  } catch (error) {
    console.error("Error uploading image:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

cloudinaryController.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res
        .status(400)
        .send(responseObject(400, false, "Public ID is required"));
    }
    await cloudinaryClass.deleteImage(publicId);
    return res
      .status(200)
      .send(responseObject(200, true, "Image deleted successfully"));
  } catch (error) {
    console.error("Error deleting image:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = cloudinaryController;
