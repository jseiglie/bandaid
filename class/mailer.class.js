require("dotenv").config();

const mailer = require("nodemailer");
const Users = require("./users.class");
const { tokenGenerator } = require("../middleware/auth.middleware");

class Mailer {
  constructor() {
    this.transporter = mailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      service: process.env.MAIL_SERVICE || "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendMail(to, subject, text) {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: to,
      subject: subject,
      text: text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async sendPasswordResetLink(to) {
    const user = await Users.getUserByEmail(to);
    if (!user.success && !user.dataValues) {
        return {
          success: false,
          message: "No user found with this email",
          status: 404,
        };
    }
    const token = tokenGenerator(user);
    const subject = "Password Reset Request";
    const text = `You have requested a password reset. Click the following link to reset 
        your password: ${process.env.FRONT_APP}/reset-password/${token}`;
    return this.sendMail(to, subject, text);
  }
}

module.exports = new Mailer(); // Ensure this is exporting an instance
