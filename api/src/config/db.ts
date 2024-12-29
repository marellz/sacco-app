import dotenv from "dotenv";
import mongoose, { Mongoose, MongooseOptions } from "mongoose";

dotenv.config();

interface DBConfig {
  db_uri?: string;
  db_options: MongooseOptions;
}

class DBConnection {
  public db: Mongoose | null = null;
  private config: DBConfig = {
    db_uri: process.env["MONGO_URL"],
    db_options: {},
  };

  constructor() {
    this.db = null;
  }

  public async connect() {
    if (!this.config.db_uri) {
      throw "Missing DB URI";
    }

    try {
      let _db = await mongoose.connect(
        this.config.db_uri,
        this.config.db_options
      );
      this.db = _db;

      console.log("DB Connected!");
    } catch (error) {
      throw "Error connecting to DB";
    }
  }

  get connected() {
    return this.db !== null && mongoose.connection.readyState !== 0;
  }

  public async disconnect() {
    if (this.connected && this.db !== null) {
      console.log("DB Disconnected!");
      await this.db.disconnect();
      this.db = null;
    } else {
      throw "DB is not connected";
    }
  }
}

export default DBConnection;
