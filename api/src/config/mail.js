import hbs from "nodemailer-express-handlebars";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const host = process.env["SMTP_HOST"] || "smtp.example.com";
const port = process.env["SMTP_PORT"] || 587;
const user = process.env["SMTP_USER"];
const pass = process.env["SMTP_PASSWORD"];

const credentials =
  user && pass
    ? {
        auth: {
          user: user,
          pass: pass,
        },
      }
    : {};

const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: port === "465",
  ...credentials,
});

const __path = path.join(__dirname, '..')

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs", // Template file extension
      partialsDir: path.join(__path, "templates"),
      defaultLayout: false,
    },
    viewPath: path.join(__path, "templates"),
    extName: ".hbs",
  })
);

export default transporter;
