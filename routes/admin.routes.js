const express = require("express");
const adminController = require("../controllers/admin.controller.js");
const { tokenMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/premium-users", adminController.getPremiumUsers);

module.exports = {
  router,
  path: "/admin",
};
