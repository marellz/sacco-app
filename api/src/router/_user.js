import express from "express";
import { update, switchRole } from "#controllers/AuthController.js";
import authenticate from '#middleware/authenticate.js';

const router = express.Router();

router.put("/profile",authenticate , update);
router.put("/switch",authenticate , switchRole);

export default router;
