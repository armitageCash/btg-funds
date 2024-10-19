import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { SubscriptionEmailData } from "@/domain/subscription";

export default class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail", // Puedes usar otros servicios como 'Outlook', etc.
      auth: {
        user: process.env.SMTP_USER, // Tu dirección de correo de Gmail
        pass: process.env.SMTP_PASS, // Tu contraseña de Gmail o contraseña de aplicación
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.SMTP_FROM, // Dirección de envío
      to,
      cc: `${process.env.EMAIL_CC}`,
      subject,
      text, // Cuerpo del correo en texto plano
      html, // Cuerpo del correo en HTML (opcional)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Correo electrónico enviado con éxito");
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
    }
    return;
  }

  async renderTemplate(
    templateName: string,
    data: SubscriptionEmailData
  ): Promise<string> {
    const templatePath = path.join(
      "dist",
      "src",
      "infraestructure",
      "email",
      "templates",
      `${templateName}.hbs`
    );

    return new Promise((resolve, reject) => {
      fs.readFile(templatePath, "utf-8", (err, templateSource) => {
        if (err) {
          return reject(`Error al leer la plantilla: ${err.message}`);
        }

        const template = handlebars.compile(templateSource);
        const emailHtml = template(data);
        resolve(emailHtml);
      });
    });
  }
}
