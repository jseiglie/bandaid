require("dotenv").config();
const cloudinary = require("cloudinary").v2;

class Cloudinary {
  constructor() {
    cloudinary.config({
      secure: true,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret key
    });
  }
  async uploadImage(file) {
    return await cloudinary.uploader.upload(file, {
      folder: "bandaid",
      use_filename: true,
      unique_filename: true,
    });
  }
  async deleteImage(publicId) {
    return await cloudinary.uploader.destroy(publicId);
  }
}

module.exports = new Cloudinary();
