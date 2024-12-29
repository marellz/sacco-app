import mongoose from "mongoose";
import userSeeder from "./_users";
// import db from "../config/db";
import DBConnection from "../config/db";

const seeders = new Map([["users", userSeeder]]);
const db = new DBConnection()

seeders.forEach(async (value, key, map) => {
  await db.connect()
  try {
    console.log(`-----------------------`)
    console.log(`SEEDING: ${key}`);
    
    if (!db.connected) {
      throw 'DB not connected';
    }
    
    await value();
    
    console.log(`SUCCESSFULLY SEEDED: ${key}`);
  } catch (error) {
    console.log(`SEED FAILED: ${key}`);
    console.error(error);
    process.exit(0)
  } finally{
    console.log(`-----------------------`);
    db.disconnect()
    process.exit(1)
  }
});
