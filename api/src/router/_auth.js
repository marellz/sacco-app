import express from "express";
import { createUser } from "../services/UserService.js";

const router = express.Router();

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {}
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await createUser({ email, name: "John Doe", password });

    res.json(user);
  } catch (error) {}
});
;

export default router;
