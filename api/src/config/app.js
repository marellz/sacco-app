import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env["API_PORT"] ?? "8000",
  app_name: process.env["APP_NAME"],
};

export default config;