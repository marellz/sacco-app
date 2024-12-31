import jwt from "jsonwebtoken";

const generate = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "4h" });
};

export default generate;
