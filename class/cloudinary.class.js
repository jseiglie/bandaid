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
     if (!file || !file.path) {
    throw new Error("File path is missing");
  }
    return await cloudinary.uploader.upload(file, {
      folder: `${process.env.APP_NAME}/images`,
      use_filename: true,
      unique_filename: true,
    });
  }
  async deleteImage(publicId) {
    return await cloudinary.uploader.destroy(publicId);
  }

  
  async uploadAudio(file) {
     if (!file || !file.path) {
    throw new Error("File path is missing");
  }
    return await cloudinary.uploader.upload(file, {
      resource_type: "raw",
      folder: `${process.env.APP_NAME}/audios`,
      use_filename: true,
      unique_filename: true,
    });
  }
  async deleteAudio(publicId) {
    return await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });
  }
async uploadMedia(file, folderName) {
  if (!file || !file.path) {
    throw new Error("File path is missing");
  }

  // Detectar tipo de recurso (image o video)
  const resourceType = file.mimetype.startsWith("video/")
    ? "video"
    : "image";

  return await cloudinary.uploader.upload(file.path, {
    folder: `${process.env.APP_NAME}/${folderName}`,
    use_filename: true,
    unique_filename: true,
    resource_type: resourceType,
  });
}
  async deleteMedia (publicId) {
    return await cloudinary.uploader.destroy(publicId);
  }

}

module.exports = new Cloudinary();
