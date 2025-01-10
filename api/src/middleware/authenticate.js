import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ error: `Unauthorized. ${error.message}` });
  }
};

export default verifyToken;
