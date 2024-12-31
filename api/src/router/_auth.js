import express from "express";
import { login, logout, register } from "#controllers/AuthController.js";
const router = express.Router();

router.post("/login", login);
router.post("/login", logout);
router.post("/register", register);

export default router;
