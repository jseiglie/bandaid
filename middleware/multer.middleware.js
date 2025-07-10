const multer = require("multer");

const multerMiddleware = {}

multerMiddleware.upload = multer({ dest: "uploads/" });

module.exports = multerMiddleware;