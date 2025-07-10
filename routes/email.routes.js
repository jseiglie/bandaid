const express = require("express");
const mailerController = require("../controllers/mailer.controller");
const router = express.Router();

router.post("/send_mail", mailerController.sendMail);
router.post("/send_password_reset", mailerController.sendPasswordResetLink);

module.exports = router;
