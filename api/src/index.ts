import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import config from "./config/app";
import registerRoutes from "./router";
import DBConnection from "./config/db";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const port = config.port;
const db = new DBConnection()
registerRoutes(app);
db.connect();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
