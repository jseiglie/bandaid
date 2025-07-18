const AdminClass = require('../class/admin.class.js');
const adminClass = new AdminClass();
const responseObject = require('../utils/response.js');
const adminController = {};

adminController.getPremiumUsers = async (req, res) => {
  try {
    // if (!req.user.isAdmin) {
    //   return res.status(403).send(responseObject(403, false, "Forbidden", null));
    // }
    const premiumUsers = await adminClass.getPremiumUsers();
    res.status(200).send(responseObject(200, true, "Premium users fetched successfully", premiumUsers));
  } catch (error) {
    console.error(error);
    res.status(500).send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = adminController;