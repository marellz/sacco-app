import express, { Request, Response } from "express";
import home from "../services/HomeService";
import { LoginRequest, RegisterRequest } from "../types/auth";
import { createUser } from "../services/UserService";

const router = express.Router();

router.post("/login", (req: LoginRequest, res: Response) => {
  try {
    const { email, password } = req.body;
  } catch (error) {}
});

router.post("/register", async (req: RegisterRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await createUser({ email, name: "John Doe", password });

    res.json(user);
  } catch (error) {}
});
;

export default router;
