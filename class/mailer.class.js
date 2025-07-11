require("dotenv").config();

const mailer = require("nodemailer");
const Users = require("./users.class");
const { tokenGenerator } = require("../middleware/auth.middleware");
const fs = require("fs");
const path = require("path");
const mjml = require("mjml");
const Mustache = require("mustache");


const templatesPath = path.join(__dirname, "..", "utils", "email_messages.json");
const templates = JSON.parse(fs.readFileSync(templatesPath, "utf8"));


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

async sendMail(to, templateKey, variables) {
  const { subject, html } = this.renderEmail(templateKey, variables);

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    html, 
    //text: "", // opcional, de necesitar version sin formato
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
  if (!user.success || !user.dataValues) {
    return {
      success: false,
      message: "No user found with this email",
      status: 404,
    };
  }

  const token = tokenGenerator(user);
  const resetLink = `${process.env.FRONT_APP}/reset-password/${token}`;

  return await this.sendMail(to, "reset", {
    nombre: user.dataValues.nombre || "Usuario",
    link_restablecimiento: resetLink,
  });
}




/**
 * Renderiza un template MJML con datos y lo compila a HTML.
 * @param {string} templateKey - Clave del template (ej: 'bienvenida') del archivo JSON.
 * @param {object} variables - Datos para reemplazar (ej: { nombre: 'Pepe' })
 * @returns {{ subject: string, html: string }}
 */
 renderEmail(templateKey, variables = {}) {
  const template = templates[templateKey];

  if (!template) {
    throw new Error(`Template no encontrado: '${templateKey}'`);
  }

  const mjmlRaw = Mustache.render(template.mjml, variables);
  const { html, errors } = mjml(mjmlRaw, { validationLevel: "strict" });

  if (errors.length) {
    console.error("Errores al compilar MJML:", errors);
    throw new Error("Error al compilar el MJML.");
  }

  return {
    subject: Mustache.render(template.subject, variables),
    html,
  };
}



}








module.exports = new Mailer(); // Ensure this is exporting an instance
