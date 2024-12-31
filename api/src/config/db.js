import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

class DBConnection {
   db = null;
   config = null

  constructor() {
    this.db = null;
    this.config = {
      db_uri: process.env["MONGO_URL"],
      db_options: {},
    };
  }

   async connect() {
    if (!this.config.db_uri) {
      console.error("Missing DB URI");
    }

    try {
      let _db = await mongoose.connect(
        this.config.db_uri,
        this.config.db_options
      );
      this.db = _db;

      console.log("DB Connected!");
    } catch (error) {
      console.log("Error connecting to DB");
      console.error(error);
    }
  }

  get connected() {
    return this.db !== null && mongoose.connection.readyState !== 0;
  }

  async disconnect() {
    if (this.connected && this.db !== null) {
      console.log("DB Disconnected!");
      await this.db.disconnect();
      this.db = null;
    } else {
      console.error( "DB is not connected");
    }
  }
}

export default DBConnection;
