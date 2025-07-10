const Mailer = require("../class/mailer.class.js");

const responseObject = require("../utils/response.js");
const mailerController = {};

mailerController.sendMail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    if (!to || !subject || !text) {
      return res
        .status(400)
        .send(
          responseObject(
            400,
            false,
            "Missing required fields: to, subject, text"
          )
        );
    }

    const response = await Mailer.sendMail(to, subject, text);
    return res
      .status(200)
      .send(responseObject(200, true, "Email sent successfully", response));
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

mailerController.sendPasswordResetLink = async (req, res) => {
  try {
    const { to } = req.body;
    if (!to) {
      return res
        .status(400)
        .send(responseObject(400, false, "Missing email address"));
    }
    const response = await Mailer.sendPasswordResetLink(to);
    if (!response.accepted) {
        return res
        .status(response.status || 400)
        .send(responseObject(response.status, false, response.message));
    }
    return res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Password reset link sent successfully",
          "Email sent to " + to
        )
      );
  } catch (error) {
    console.error("Error sending password reset link:", error);
    return res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

module.exports = mailerController;
