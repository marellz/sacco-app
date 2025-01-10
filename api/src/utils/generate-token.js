import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generate = (id, email) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw "SECRET not found!";
    }

    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "4h" });
  } catch (error) {
    console.error({ error });
  }
};

export default generate;
